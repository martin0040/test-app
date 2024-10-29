require('dotenv').config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import dbConnect from './conifg/db';
import session from 'express-session';
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

dbConnect();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret', // Replace with a strong secret
  saveUninitialized: true,
  cookie: {
    maxAge: 10 * 60 * 1000, // 10min in milliseconds
    secure: false // Set to true if using HTTPS
  }
}));

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Set routers
routes(app);

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Updated path resolution

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
