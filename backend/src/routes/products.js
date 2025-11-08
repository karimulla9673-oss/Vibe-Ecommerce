import express from 'express';
import { getProducts, getProductById, seedProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/seed', seedProducts); // Run once to seed DB
router.get('/:id', getProductById);

export default router;