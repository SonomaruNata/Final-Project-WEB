import express from 'express';
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/articleController.js';

const router = express.Router();

// Routes
router.get('/', getArticles);              // Fetch all articles
router.get('/:id', getArticleById);        // Fetch a specific article
router.post('/', createArticle);           // Create a new article
router.put('/:id', updateArticle);         // Update an article
router.delete('/:id', deleteArticle);      // Delete an article

export default router;
