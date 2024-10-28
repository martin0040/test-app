import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/authRoutes';
import listRoutes from './routes/listRoutes';
import './config/mongoose';
import jwt from 'jsonwebtoken';

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use('/uploads', express.static(path.resolve(__dirname, './public/uploads'))); // Serve static files from uploads directory
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Sample user data (in practice, use a database)
var users: { [key: string]: { name: string, email: string, password: string, expiresIn: number } } = {};

// Middleware for protected routes
const authenticateUser = (req: any, res: Response, next: NextFunction) => {
  if ((req.session as any).email) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }
};

interface JWTPayload {
  name: string;
  [key: string]: any;
}

const refSignin = async (req: any, res: Response) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JWTPayload;
    const name = decoded.email;
    console.log(decoded, '---- decoded', users);
    const user = users[name];
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    } else if (Date.now() > user.expiresIn) {
      return res.status(401).json({ error: 'Token expired' });
    }// Check if token is expired
    if (Date.now() > user.expiresIn) {
      return res.status(401).json({ error: 'Token expired' });
    }

    (req.session as any).name = name;
    return res.json({
      message: `Welcome back, ${name}!`,
      userData: user
    });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
// Routes
app.post("/refresh", asyncHandler(refSignin));


app.post('/signout', (req: any, res: Response) => {
  req.session.destroy((err: Error | null) => {
    if (err) {
      return res.status(500).json({ error: 'Could not log out.' });
    }
    res.json({ message: 'Logged out successfully.' });
  });
});
// Routes
app.use('/auth', authRoutes);
app.use('/list', listRoutes);
// Error handling middleware
app.use((err: Error, req: any, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { users };
