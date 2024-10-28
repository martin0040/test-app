import { Router } from 'express';
const router = Router();
const multer  = require('multer')

import { uploadList, getList } from '../controllers/listController';
const upload = multer({ dest: './public/uploads/' })
// Registration route
router.get('/', getList);
router.post('/',upload.single('file'), uploadList);
// Login route

export default router;