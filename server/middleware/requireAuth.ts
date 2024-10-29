import { Request, Response, NextFunction } from 'express';

type CustomRequest = Request & { session: any };

const requiresAuth = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        // Your asynchronous code here
        if (!req.session.user) {
            throw res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    } catch (error) {
         res.status(401).json({ message: 'Unauthorized' });
    }
};

export default requiresAuth;