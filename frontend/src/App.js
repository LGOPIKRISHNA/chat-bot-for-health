// File: App.js

import React from 'react';
import OrderForm from './components/OrderForm';
import OrderSummary from './components/OrderSummary';
import Revenue from './components/Revenue';

function App() {
    return (
        <div>
            <h1>Order Management System</h1>
            <OrderForm />
            <OrderSummary />
            <Revenue />
        </div>
    );
}

export default App;
