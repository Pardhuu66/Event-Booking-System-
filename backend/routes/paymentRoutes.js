import express from 'express';
import {
    createPayPalOrder,
    capturePayPalOrder,
    verifyPayment
} from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Create PayPal order
router.post('/create-order', protect, createPayPalOrder);

// Capture PayPal payment
router.post('/capture-order', protect, capturePayPalOrder);

// Verify payment status
router.get('/verify/:orderId', protect, verifyPayment);

export default router;
