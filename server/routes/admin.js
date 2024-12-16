import express from 'express';
import { updateProduct, deleteProduct, manageOrders, manageArticles } from '../controllers/adminController.js';
import verifyJWT from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/dashboard', verifyJWT, (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard', user: req.user });
  });
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);
router.get('/orders', manageOrders);
router.get('/articles', manageArticles);

export default router;
