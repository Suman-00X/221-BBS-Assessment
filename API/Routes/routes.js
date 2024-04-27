import express from 'express';

import { userSignup, userLogin } from '../Controllers/userControllers';
import { addProduct, updateProduct, deleteProduct } from '../Controllers/productController.js';
import isAdmin from '../Middlewares/adminMiddleware.js';

const router = express.Router();

//user routes (login, signup)
router.post('/signup', userSignup);
router.post('/login', userLogin);


// Admin routes for product(add, modify and delete)
router.post('/add', authenticateToken, isAdmin, addProduct);
router.put('/update/:id', authenticateToken, isAdmin, updateProduct);
router.delete('/delete/:id', authenticateToken, isAdmin, deleteProduct);


export default router;