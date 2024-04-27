import express from 'express';

import { userSignup, userLogin, getUserProfile } from '../Controllers/userControllers';

const router = express.Router();

//user routes (login, signup)
router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/profile', authenticateToken, getUserProfile);

export default router;