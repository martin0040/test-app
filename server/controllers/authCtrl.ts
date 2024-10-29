import { NextFunction, Request, Response } from "express";
import { Session } from 'express-session';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import createHttpError from 'http-errors';

interface CustomRequest extends Request {
    session: Session & { user?: any }; // Adjust based on your actual session structure
}
export const signup = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const email = req.body.email;
    const rawPassword = req.body.password;

    try {
        if (!username || !email || !rawPassword) {
            throw createHttpError(400, 'Params missing');
        }

        const existingUsername = await User.findOne({ username }).exec();
        if (existingUsername) {
            throw createHttpError(409, 'A user with this username already exists.');
        }

        const existingEmail = await User.findOne({ email }).exec();
        if (existingEmail) {
            throw createHttpError(409, 'A user with this email address already exists.');
        }

        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        next(error);
    }
}
export const signin = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw createHttpError(400, 'Params missing')
        }

        const user = await User.findOne({ email })
        if (!user) {
            throw createHttpError(401, 'Invalid Account')
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            throw createHttpError(401, 'Invalid Password')
        }

        req.session.user = user
        await req.session.save();
        res.status(201).json({ message: 'User signed in successfully', user })
    } catch (error) {
        console.error(error);
        next(error)
    }
}
export const signout = async (req: CustomRequest, res: Response, next: NextFunction) => {
    req.session.destroy(error => {
        if (error) {
            next(error)
        } else {
            res.sendStatus(200)
        }
    })
}
export const getUserInfo = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log('getUserInfo', req.session.user)
        if (!req.session.user) {
            res.status(401).json({ message: 'Unauthorized' });
        } else {
            const user = await User.findOne({ _id: req.session.user._id }).select('+email +username').exec()
            if (!user) {
                res.status(401).json({ message: 'Unauthorized' });
            } else {
                res.status(200).json(user);
            }
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};
