import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import listRoutes from './routes/lists';
import userRoutes from './routes/users';
import morgan from 'morgan';
import cors from 'cors';
import createHttpError, { isHttpError } from 'http-errors';
import session from 'express-session';
import env from './util/validateEnv';
import MongoStore from 'connect-mongo';
import path from 'path';
import { requiresAuth } from './middleware/auth';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
    rolling: true,
    store: MongoStore.create({ mongoUrl: env.MONGO_CONNECTION_STRING }),
  })
);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))); // Updated path resolution

app.use('/api/auth', userRoutes);
app.use('/api/lists', listRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMsg = 'An unknown error occured.';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMsg = error.message;
  }
  res.status(statusCode).json({ error: errorMsg });
});

export default app;
