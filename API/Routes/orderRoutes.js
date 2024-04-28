import express from 'express';

import { getAllHoodies, getOneHoodie, orderHoodie, getAllOrders } from '../Controllers/orderController.js';
import { authenticateToken } from '../Middlewares/jwtMiddleware.js';

const router = express.Router();

// User routes (browse and order)
router.get('/', getAllHoodies);
router.get('/:id', getOneHoodie);
router.post('/order', authenticateToken, orderHoodie);
router.get('./all-orders', authenticateToken, getAllOrders)

export default router;