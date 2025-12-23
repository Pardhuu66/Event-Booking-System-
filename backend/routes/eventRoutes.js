import express from 'express';
import {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
    getCategories,
    getFeaturedEvents
} from '../controllers/eventController.js';
import { searchEvents } from '../controllers/searchController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(getEvents)
    .post(protect, authorize('admin'), createEvent);

router.get('/search', searchEvents);
router.get('/categories', getCategories);
router.get('/featured', getFeaturedEvents);

router.route('/:id')
    .get(getEvent)
    .put(protect, authorize('admin'), updateEvent)
    .delete(protect, authorize('admin'), deleteEvent);

export default router;
