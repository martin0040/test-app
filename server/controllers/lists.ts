import { NextFunction, RequestHandler, Response } from 'express';
import ListModel from '../models/lists';

export const getList: RequestHandler = async (req, res, next) => {

  try {
    const lists = await ListModel.find({}).exec();

    res.status(200).json(lists);
  } catch (error) {
    next(error);
  }
};


export const createList = async (req: any, res: Response, next: NextFunction) => {
  try {
    const list = new ListModel({
      title: req.body.title,
      icon: req.file.filename,
      link: req.body.link
    });
    await list.save();
    const lists = await ListModel.find();
    res.status(200).send(lists);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// interface UpdateListParams {
//   listId: string;
// }

// interface UpdateListBody {
//   title?: string;
//   body?: string;
// }

// export const updateList: RequestHandler<
//   UpdateListParams,
//   unknown,
//   UpdateListBody,
//   unknown
// > = async (req, res, next) => {
//   const sessionUserId = req.session.userId;
//   const listId = req.params.listId;
//   const newTitle = req.body.title;
//   const newBody = req.body.body;

//   try {
//     assertIsDefined(sessionUserId);

//     if (!mongoose.isValidObjectId(listId)) {
//       throw createHttpError(400, 'Invalid list id.');
//     }

//     if (!newTitle) throw createHttpError(400, 'List must have a title.');

//     const list = await ListModel.findById(listId).exec();

//     if (!list) throw createHttpError(404, 'List not found.');

//     if (!list.userId.equals(sessionUserId)) {
//       throw createHttpError(401, 'You cannot access this list');
//     }

//     list.title = newTitle;
//     list.body = newBody;
//     const updatedList = await list.save();
//     res.status(200).json(updatedList);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteList: RequestHandler = async (req, res, next) => {
//   const sessionUserId = req.session.userId;
//   const listId = req.params.listId;

//   try {
//     assertIsDefined(sessionUserId);

//     if (!mongoose.isValidObjectId(listId)) {
//       throw createHttpError(400, 'Invalid list id.');
//     }

//     const list = await ListModel.findById(listId).exec();

//     if (!list) throw createHttpError(404, 'List not found.');

//     if (!list.userId.equals(sessionUserId)) {
//       throw createHttpError(401, 'You cannot access this list');
//     }

//     await ListModel.deleteOne({ _id: listId }); // or list.remove()
//     res.sendStatus(204);
//   } catch (error) {
//     next(error);
//   }
// };
