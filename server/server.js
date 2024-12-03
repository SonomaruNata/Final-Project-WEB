import express from 'express';
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
import connect from './connectToDB.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());




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
app.listen(PORT, () => {
  connect();
console.log(`Server running on port ${PORT}`)


}
);
