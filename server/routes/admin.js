import express from 'express';
import { updateProduct, deleteProduct, manageOrders, manageArticles } from '../controllers/adminController.js';

const router = express.Router();

router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);
router.get('/orders', manageOrders);
router.get('/articles', manageArticles);

export default router;
