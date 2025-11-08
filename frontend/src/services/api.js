import axios from 'axios';

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const BASE_URL = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;

// Remove any trailing /api to prevent double /api in requests
const API_BASE = BASE_URL.endsWith('/api') ? BASE_URL.slice(0, -4) : BASE_URL;

console.log('API Base URL:', API_BASE); // Debug log

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = async () => {
  const response = await api.get('/api/products');
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

// Cart
export const getCart = async (userId = 'guest-user') => {
  const response = await api.get(`/api/cart?userId=${userId}`);
  return response.data;
};

export const addToCart = async (productId, quantity = 1, userId = 'guest-user') => {
  const response = await api.post('/api/cart', {
    productId,
    quantity,
    userId,
  });
  return response.data;
};

export const updateCartItem = async (itemId, quantity, userId = 'guest-user') => {
  const response = await api.put(`/api/cart/${itemId}`, {
    quantity,
    userId,
  });
  return response.data;
};

export const removeFromCart = async (itemId, userId = 'guest-user') => {
  const response = await api.delete(`/api/cart/${itemId}?userId=${userId}`);
  return response.data;
};

export const clearCart = async (userId = 'guest-user') => {
  const response = await api.delete(`/api/cart?userId=${userId}`);
  return response.data;
};

// Checkout
export const checkout = async (checkoutData) => {
  const response = await api.post('/api/checkout', checkoutData);
  return response.data;
};

export const getOrders = async (userId = 'guest-user') => {
  const response = await api.get(`/api/checkout/orders?userId=${userId}`);
  return response.data;
};

export default api;