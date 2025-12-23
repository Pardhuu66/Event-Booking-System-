import Event from '../models/Event.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
    try {
        const { category, city, search, date, featured, status } = req.query;

        let query = {};

        // Filter by category
        if (category && category !== 'all') {
            query.category = category;
        }

        // Filter by city
        if (city) {
            query.city = { $regex: city, $options: 'i' };
        }

        // Search in title and description
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { organizer: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by date
        if (date) {
            const searchDate = new Date(date);
            const nextDay = new Date(searchDate);
            nextDay.setDate(nextDay.getDate() + 1);

            query.date = {
                $gte: searchDate,
                $lt: nextDay
            };
        }

        // Filter by featured
        if (featured) {
            query.featured = featured === 'true';
        }

        // Filter by status (default to upcoming)
        query.status = status || 'upcoming';

        const events = await Event.find(query).sort({ date: 1 });

        res.status(200).json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
export const getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        res.status(200).json({
            success: true,
            data: event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
export const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);

        res.status(201).json({
            success: true,
            data: event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
export const updateEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        await event.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Event deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get event categories
// @route   GET /api/events/categories
// @access  Public
export const getCategories = async (req, res) => {
    try {
        const categories = ['concert', 'conference', 'sports', 'theater', 'workshop', 'festival', 'tech-meetup', 'cultural'];

        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get featured events
// @route   GET /api/events/featured
// @access  Public
export const getFeaturedEvents = async (req, res) => {
    try {
        const events = await Event.find({ 
            featured: true, 
            status: 'upcoming' 
        })
        .sort({ date: 1 })
        .limit(6);

        res.status(200).json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
