import { Request, Response, NextFunction } from 'express';

export const signup_middleware = (req: Request, res: Response, next: NextFunction): void => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return; // Ensure the function returns `void`
    }
    next();
};

export const signin_middleware = (req: Request, res: Response, next: NextFunction): void => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return; // Ensure the function returns `void`
    }
    next();
};