import express from 'express';

import { getAllHoodies, getOneHoodie, orderHoodie } from './userController.js';

const router = express.Router();

// User routes (browse and order)
router.get('/products', getAllHoodies);
router.get('/products/:id', getOneHoodie);
router.post('/order', authenticateToken, orderHoodie);

export default router;