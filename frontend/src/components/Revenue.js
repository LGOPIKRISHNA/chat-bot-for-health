// File: components/Revenue.js

import React, { useState } from 'react';
import axios from 'axios';

const Revenue = () => {
    const [revenue, setRevenue] = useState(null);

    const fetchRevenue = async () => {
        try {
            const res = await axios.get('http://localhost:5000/revenue');
            setRevenue(res.data.totalRevenue);
        } catch (error) {
            console.error(error);
            setRevenue('Error fetching revenue');
        }
    };

    return (
        <div>
            <h2>Total Revenue</h2>
            <button onClick={fetchRevenue}>Fetch Revenue</button>
            {revenue !== null && <h3>Total Revenue: ₹{revenue}</h3>}
        </div>
    );
};

export default Revenue;
