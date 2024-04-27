import express from 'express';

import { signup, login, getUserProfile } from '../Controllers/userController.js';
import { authenticateToken } from '../Middlewares/jwtMiddleware.js';

const router = express.Router();

//user routes (login, signup)
router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authenticateToken, getUserProfile);

export default router;