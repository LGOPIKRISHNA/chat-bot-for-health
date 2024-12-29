// File: components/OrderSummary.js

import React, { useState } from 'react';
import axios from 'axios';

const OrderSummary = () => {
    const [orderId, setOrderId] = useState('');
    const [orderData, setOrderData] = useState(null);

    const fetchOrder = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/orders/${orderId}`);
            setOrderData(res.data);
        } catch (error) {
            console.error(error);
            setOrderData({ error: 'Order not found' });
        }
    };

    return (
        <div>
            <h2>Order Summary</h2>
            <input
                type="text"
                placeholder="Enter Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
            />
            <button onClick={fetchOrder}>Fetch Order</button>
            {orderData && (
                <div>
                    <h3>Order Details:</h3>
                    <pre>{JSON.stringify(orderData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default OrderSummary;
