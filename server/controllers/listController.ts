import { Response } from 'express';
import List from '../models/List';

export const uploadList = async (req: any, res: Response) => {
    try {
        const list = new List({
            title: req.body.title,
            icon: req.file.filename,
            link: req.body.link
        });
        await list.save();
        const lists = await List.find();
        res.status(200).send(lists);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export const getList = async (req: any, res: Response) => {
    try {
        const lists = await List.find();
        res.status(200).send(lists);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
