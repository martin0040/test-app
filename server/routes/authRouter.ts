import express from 'express';
import { signup, signin, signout, getUserInfo } from '../controllers/authCtrl';
import requiresAuth from '../middleware/requireAuth';
const router = express.Router();

router.get('/refresh', getUserInfo);
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signout', signout);

export default router;
