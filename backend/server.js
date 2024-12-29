// Add the following routes to server.js
// File: server.js

const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory database
const orders = [];

// Helper function to calculate discounts
function calculateDiscount(quantity, price) {
    let totalAmount = quantity * price;
    let discount = 0;

    // 10% discount for orders > ₹10,000
    if (totalAmount > 10000) {
        discount += totalAmount * 0.1;
    }

    // Flat ₹500 discount for more than 5 items
    if (quantity > 5) {
        discount += 500;
    }

    const finalAmount = totalAmount - discount;
    return { discount, finalAmount };
}

// API: Place an Order
app.post('/orders', (req, res) => {
    const { productName, quantity, price } = req.body;

    // Validate inputs
    if (!productName || quantity <= 0 || price <= 0) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    const orderId = uuidv4();
    const timestamp = new Date();
    const { discount, finalAmount } = calculateDiscount(quantity, price);

    const order = {
        orderId,
        productName,
        quantity,
        price,
        discount,
        finalAmount,
        timestamp,
    };

    orders.push(order);
    res.status(201).json(order);
});

// API: Get Order Summary
app.get('/orders/:id', (req, res) => {
    const { id } = req.params;
    const order = orders.find((order) => order.orderId === id);

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
});

// API: Calculate Total Revenue
app.get('/revenue', (req, res) => {
    const totalRevenue = orders.reduce((acc, order) => acc + order.finalAmount, 0);
    res.json({ totalRevenue });
});

// Start the server

// API: Delete Order
app.delete('/orders/:id', (req, res) => {
    const { id } = req.params;
    const orderIndex = orders.findIndex((order) => order.orderId === id);

    if (orderIndex === -1) {
        return res.status(404).json({ error: 'Order not found' });
    }

    orders.splice(orderIndex, 1);
    res.json({ message: 'Order deleted successfully' });
});

// API: Edit Order
app.put('/orders/:id', (req, res) => {
    const { id } = req.params;
    const { productName, quantity, price } = req.body;

    // Validate inputs
    if (!productName || quantity <= 0 || price <= 0) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    const order = orders.find((order) => order.orderId === id);

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    // Update order details and recalculate discounts
    order.productName = productName;
    order.quantity = quantity;
    order.price = price;

    const { discount, finalAmount } = calculateDiscount(quantity, price);
    order.discount = discount;
    order.finalAmount = finalAmount;

    res.json(order);
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
