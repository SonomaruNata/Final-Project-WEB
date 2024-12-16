import express from 'express';
import verifyJWT from '../middlewares/authMiddleware.js'; // Correct path

const router = express.Router();

// Public route (no authentication required)
router.get('/public', (req, res) => {
  res.json({ message: 'This is a public route' });
});

// Protected route (authentication required)
router.get('/protected', verifyJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

export default router;
