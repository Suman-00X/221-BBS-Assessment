import express from 'express';

import { addProduct, updateProduct, deleteProduct } from '../Controllers/productController.js';

const router = express.Router();

// Admin routes for product(add, modify and delete)
router.post('/add', authenticateToken, isAdmin, addProduct);
router.put('/update/:id', authenticateToken, isAdmin, updateProduct);
router.delete('/delete/:id', authenticateToken, isAdmin, deleteProduct);

export default router;