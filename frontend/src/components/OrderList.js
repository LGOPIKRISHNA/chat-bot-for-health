// File: components/OrderList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://localhost:5000/orders');
            setOrders(res.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const deleteOrder = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/orders/${id}`);
            fetchOrders(); // Refresh order list
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h2>Order List</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order.orderId}>
                        {order.productName} - ₹{order.finalAmount}
                        <button onClick={() => deleteOrder(order.orderId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderList;
