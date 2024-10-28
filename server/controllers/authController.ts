import User from '../models/User';
import bcrypt from 'bcrypt';
import { users } from '../server';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return; // Ensure the function returns void
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    const recordResult = await user.save();
    console.log(recordResult, '---- register');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'User registration failed', error });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return; // Ensure the function returns void
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ message: 'Invalid password' });
      return; // Ensure the function returns void
    }
    
    const token = jwt.sign({ email: user.email, password: password }, 'secret');
    users[email] = { name: user.name,email: user.email, password: user.password, expiresIn: Date.now() + 24 * 60 * 60 * 1000 };
    res.status(200).json({ message: 'Login successful', userData: user, token });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Login failed', error });
  }
};
