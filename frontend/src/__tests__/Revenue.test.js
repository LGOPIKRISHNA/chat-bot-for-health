// File: components/Revenue.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Revenue from './Revenue';

jest.mock('axios');

describe('Revenue Component', () => {
    it('should render fetch revenue button', () => {
        render(<Revenue />);
        expect(screen.getByText(/Fetch Revenue/i)).toBeInTheDocument();
    });

    it('should display total revenue after API call', async () => {
        axios.get.mockResolvedValueOnce({ data: { totalRevenue: 5000 } });

        render(<Revenue />);
        fireEvent.click(screen.getByText(/Fetch Revenue/i));

        const revenue = await screen.findByText(/₹5000/i);
        expect(revenue).toBeInTheDocument();
    });

    it('should display error on API failure', async () => {
        axios.get.mockRejectedValueOnce(new Error('Failed to fetch revenue'));

        render(<Revenue />);
        fireEvent.click(screen.getByText(/Fetch Revenue/i));

        const error = await screen.findByText(/Error fetching revenue/i);
        expect(error).toBeInTheDocument();
    });
});
