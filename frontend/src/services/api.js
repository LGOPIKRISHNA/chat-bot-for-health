import axios from 'axios';

// Set the base URL for the API
const API_BASE_URL = 'http://localhost:5000';

// Abstracted API calls

/**
 * Place an order
 * @param {Object} orderData - { productName: string, quantity: number, price: number }
 * @returns {Promise} - API response
 */
export const placeOrder = (orderData) => {
    return axios.post(`${API_BASE_URL}/orders`, orderData);
};

/**
 * Get order details by ID
 * @param {string} orderId - Unique order ID
 * @returns {Promise} - API response
 */
export const getOrder = (orderId) => {
    return axios.get(`${API_BASE_URL}/orders/${orderId}`);
};

/**
 * Get total revenue
 * @returns {Promise} - API response
 */
export const getRevenue = () => {
    return axios.get(`${API_BASE_URL}/revenue`);
};

/**
 * Delete an order by ID
 * @param {string} orderId - Unique order ID
 * @returns {Promise} - API response
 */
export const deleteOrder = (orderId) => {
    return axios.delete(`${API_BASE_URL}/orders/${orderId}`);
};

/**
 * Edit an order by ID
 * @param {string} orderId - Unique order ID
 * @param {Object} updatedData - { productName: string, quantity: number, price: number }
 * @returns {Promise} - API response
 */
export const editOrder = (orderId, updatedData) => {
    return axios.put(`${API_BASE_URL}/orders/${orderId}`, updatedData);
};
