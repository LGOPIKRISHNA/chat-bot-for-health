// File: components/OrderSummary.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import OrderSummary from './OrderSummary';

jest.mock('axios');

describe('OrderSummary Component', () => {
    it('should render input and button', () => {
        render(<OrderSummary />);
        expect(screen.getByPlaceholderText(/Enter Order ID/i)).toBeInTheDocument();
        expect(screen.getByText(/Fetch Order/i)).toBeInTheDocument();
    });

    it('should fetch and display order details on valid ID', async () => {
        axios.get.mockResolvedValueOnce({
            data: { orderId: '123', productName: 'Laptop', finalAmount: 1800 },
        });

        render(<OrderSummary />);
        fireEvent.change(screen.getByPlaceholderText(/Enter Order ID/i), { target: { value: '123' } });
        fireEvent.click(screen.getByText(/Fetch Order/i));

        const orderDetails = await screen.findByText(/Laptop/i);
        expect(orderDetails).toBeInTheDocument();
    });

    it('should display error message for invalid order ID', async () => {
        axios.get.mockRejectedValueOnce(new Error('Order not found'));

        render(<OrderSummary />);
        fireEvent.change(screen.getByPlaceholderText(/Enter Order ID/i), { target: { value: 'invalid' } });
        fireEvent.click(screen.getByText(/Fetch Order/i));

        const error = await screen.findByText(/Order not found/i);
        expect(error).toBeInTheDocument();
    });
});
