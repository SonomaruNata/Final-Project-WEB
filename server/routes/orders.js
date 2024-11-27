import express from 'express';
const router = express.Router();

// Sample orders data
const orders = [
  { id: 1, item: 'Product1', quantity: 1 },
  { id: 2, item: 'Product2', quantity: 2 },
];

// GET all orders
router.get('/', (req, res) => {
  res.json(orders);
});

// GET a specific order by ID
router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// POST a new order
router.post('/', (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    item: req.body.item,
    quantity: req.body.quantity,
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// DELETE an order
router.delete('/:id', (req, res) => {
  const orderIndex = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (orderIndex !== -1) {
    orders.splice(orderIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

export default router;
