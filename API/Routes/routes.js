import express from 'express';
import { userSignup, userLogin } from '../Controllers/userControllers';

const router = express.Router();

//user routes (login, signup)
router.post('/signup', userSignup);
router.post('/login', userLogin);


export default router;
