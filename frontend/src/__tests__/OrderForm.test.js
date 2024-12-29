// File: components/OrderForm.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import OrderForm from './OrderForm';

jest.mock('axios');

describe('OrderForm Component', () => {
    it('should render form inputs and submit button', () => {
        render(<OrderForm />);
        expect(screen.getByPlaceholderText(/Product Name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Quantity/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Price/i)).toBeInTheDocument();
        expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    });

    it('should update state on input change', () => {
        render(<OrderForm />);
        const productNameInput = screen.getByPlaceholderText(/Product Name/i);
        fireEvent.change(productNameInput, { target: { value: 'Laptop' } });
        expect(productNameInput.value).toBe('Laptop');
    });

    it('should call API and display response on form submission', async () => {
        axios.post.mockResolvedValueOnce({
            data: { productName: 'Laptop', quantity: 2, finalAmount: 1800 },
        });

        render(<OrderForm />);
        fireEvent.change(screen.getByPlaceholderText(/Product Name/i), { target: { value: 'Laptop' } });
        fireEvent.change(screen.getByPlaceholderText(/Quantity/i), { target: { value: '2' } });
        fireEvent.change(screen.getByPlaceholderText(/Price/i), { target: { value: '900' } });
        fireEvent.click(screen.getByText(/Submit/i));

        const response = await screen.findByText(/Laptop/i);
        expect(response).toBeInTheDocument();
    });
});
