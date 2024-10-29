import { Request, Response } from "express"
import authRouter from './authRouter'
import listsRouter from './listsRouter'
import path from "path"
const Router = (app: any) => {
    app.use('/api/auth', authRouter);
    app.use('/api/lists', listsRouter);
}

export default Router;