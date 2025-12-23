import express from 'express';
import {
    createBooking,
    confirmBooking,
    getMyBookings,
    getBooking,
    getAllBookings,
    cancelBooking,
    getBookingStats
} from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .post(protect, createBooking)
    .get(protect, authorize('admin'), getAllBookings);

router.get('/my-bookings', protect, getMyBookings);
router.get('/stats', protect, authorize('admin'), getBookingStats);

router.route('/:id')
    .get(protect, getBooking);

router.post('/:id/confirm', protect, confirmBooking);
router.put('/:id/cancel', protect, cancelBooking);

export default router;
