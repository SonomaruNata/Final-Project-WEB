import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/users.js';
import productRoutes from './routes/products.js';
import adminRoutes from './routes/admin.js';
import shopRoutes from './routes/shop.js';
import articleRoutes from './routes/articles.js';
import cartRoutes from './routes/cart.js';
import contactRoutes from './routes/contact.js';

import orderRoutes from './routes/orders.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/routes/users', userRoutes);
app.use('/routes/products', productRoutes);
app.use('/routes/admin', adminRoutes);
app.use('/routes/shop', shopRoutes);
app.use('/routes/articles', articleRoutes);
app.use('/routes/contact', contactRoutes);
app.use('/routes/cart', cartRoutes);
app.use('/routes/orders', orderRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
