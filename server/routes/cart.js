import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get all cart items for a user
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('cart.product');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart items', error: err.message });
  }
});

// Add an item to the cart
router.post('/', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existingItem = user.cart.find((item) => item.product.toString() === productId);

    if (existingItem) {
      // Update quantity if the product already exists in the cart
      existingItem.quantity += quantity;
    } else {
      // Add new product to the cart
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.status(200).json({ message: 'Item added to cart', cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: 'Error adding item to cart', error: err.message });
  }
});

// Update cart item quantity
router.put('/:userId/:productId', async (req, res) => {
  const { quantity } = req.body;

  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const item = user.cart.find((item) => item.product.toString() === req.params.productId);
    if (!item) return res.status(404).json({ message: 'Product not found in cart' });

    // Update quantity
    item.quantity = quantity;
    await user.save();

    res.status(200).json({ message: 'Cart updated', cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: 'Error updating cart', error: err.message });
  }
});

// Remove an item from the cart
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = user.cart.filter((item) => item.product.toString() !== req.params.productId);
    await user.save();

    res.status(200).json({ message: 'Item removed from cart', cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: 'Error removing item from cart', error: err.message });
  }
});

// Clear the entire cart
router.delete('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = [];
    await user.save();

    res.status(200).json({ message: 'Cart cleared', cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: 'Error clearing cart', error: err.message });
  }
});

export default router;
