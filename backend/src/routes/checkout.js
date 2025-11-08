import express from 'express';
import { checkout, getOrders } from '../controllers/checkoutController.js';

const router = express.Router();

router.post('/', checkout);
router.get('/orders', getOrders);

export default router;