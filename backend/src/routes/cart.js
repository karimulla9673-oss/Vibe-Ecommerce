import express from 'express';
import {
	getCart,
	addToCart,
	updateCartItem,
	removeFromCart,
	clearCart,
} from '../controllers/cartController.js';

const router = express.Router();

// GET /api/cart?userId=...
router.get('/', getCart);

// POST /api/cart
router.post('/', addToCart);

// PUT /api/cart/:id
router.put('/:id', updateCartItem);

// DELETE /api/cart/:id
router.delete('/:id', removeFromCart);

// DELETE /api/cart?userId=...  (clear cart)
router.delete('/', clearCart);

export default router;