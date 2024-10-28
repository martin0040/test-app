import { Router } from 'express';
const router = Router();
const multer  = require('multer')

import { createList, getList } from '../controllers/lists';
const upload = multer({ dest: './uploads/' })
// Registration route
router.get('/', getList);
router.post('/',upload.single('file'), createList);
// Login route

export default router;