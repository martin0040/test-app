import express from "express";
import * as UserController from '../controllers/users'

const router = express.Router()

router.get('/refresh/:userId', UserController.getSessionUser)
router.post('/signup', UserController.signUp)
router.post('/signin', UserController.signIn)
router.post('/signout', UserController.signOut)

export default router;
