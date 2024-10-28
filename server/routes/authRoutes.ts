import { Router } from 'express';
import { signin_middleware, signup_middleware } from '../middleware/authMiddleware';
import { signup, signin } from '../controllers/authController';

const router = Router();

// Registration route
router.post('/signin', signin_middleware, signin);
router.post('/signup', signup_middleware, signup);
// Login route

export default router;
