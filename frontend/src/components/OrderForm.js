// File: components/OrderForm.js

import React, { useState } from 'react';
import "../App.css";
import axios from 'axios';

const OrderForm = () => {
    const [formData, setFormData] = useState({ productName: '', quantity: '', price: '' });
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/orders', {
                productName: formData.productName,
                quantity: parseInt(formData.quantity, 10),
                price: parseFloat(formData.price),
            });
            setResponse(res.data);
        } catch (error) {
            console.error(error);
            setResponse({ error: 'Failed to place order' });
        }
    };

    return (
        <div class="andall">
            <h2>Place an Order</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="productName"
                    placeholder="Product Name"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
            {response && (
                <div>
                    <h3>Order Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default OrderForm;
