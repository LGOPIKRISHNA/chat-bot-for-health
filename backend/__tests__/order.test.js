// File: __tests__/order.test.js

const request = require('supertest');
const app = require('../server'); // Import the Express app

describe('Order Management System APIs', () => {
    let orderId;

    it('should create a new order', async () => {
        const res = await request(app)
            .post('/orders')
            .send({
                productName: 'Laptop',
                quantity: 10,
                price: 1500,
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('orderId');
        expect(res.body.finalAmount).toBeLessThan(15000); // Discount applied
        orderId = res.body.orderId; // Save the ID for later tests
    });

    it('should retrieve an order by ID', async () => {
        const res = await request(app).get(`/orders/${orderId}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('productName', 'Laptop');
    });

    it('should return 404 for invalid order ID', async () => {
        const res = await request(app).get('/orders/invalid-id');
        expect(res.status).toBe(404);
    });

    it('should calculate total revenue', async () => {
        const res = await request(app).get('/revenue');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('totalRevenue');
    });

    it('should update an order by ID', async () => {
        const res = await request(app)
            .put(`/orders/${orderId}`)
            .send({
                productName: 'Laptop Pro',
                quantity: 5,
                price: 1800,
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('productName', 'Laptop Pro');
        expect(res.body.finalAmount).toBeGreaterThan(8000); // Updated calculation
    });

    it('should delete an order by ID', async () => {
        const res = await request(app).delete(`/orders/${orderId}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Order deleted successfully');
    });

    it('should return 404 for deleted order', async () => {
        const res = await request(app).get(`/orders/${orderId}`);
        expect(res.status).toBe(404);
    });
});
