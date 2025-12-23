import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import User from '../models/User.js';
import QRCode from 'qrcode';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
    try {
        const { eventId, numberOfTickets, attendeeName, attendeeEmail, attendeePhone } = req.body;

        // Get event
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Check if event is in the past
        if (new Date(event.date) < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'Cannot book tickets for past events'
            });
        }

        // Check if event is cancelled
        if (event.status === 'cancelled') {
            return res.status(400).json({
                success: false,
                message: 'Cannot book tickets for cancelled events'
            });
        }

        // Check availability
        if (event.availableSeats < numberOfTickets) {
            return res.status(400).json({
                success: false,
                message: `Only ${event.availableSeats} seats available`
            });
        }

        // Calculate total price
        const totalPrice = event.price * numberOfTickets;

        // Create booking
        const booking = await Booking.create({
            user: req.user.id,
            event: eventId,
            numberOfTickets,
            totalPrice,
            attendeeName,
            attendeeEmail,
            attendeePhone: attendeePhone || '',
            status: 'pending',
            paymentStatus: 'pending'
        });

        res.status(201).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Confirm booking after payment
// @route   POST /api/bookings/:id/confirm
// @access  Private
export const confirmBooking = async (req, res) => {
    try {
        const { paymentIntentId } = req.body;

        const booking = await Booking.findById(req.params.id).populate('event');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Check if booking belongs to user
        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this booking'
            });
        }

        // Update event available seats
        const event = await Event.findById(booking.event._id);
        event.availableSeats -= booking.numberOfTickets;
        await event.save();

        // Generate QR code
        const qrData = JSON.stringify({
            bookingId: booking._id,
            eventId: booking.event._id,
            userId: booking.user,
            tickets: booking.numberOfTickets
        });

        const qrCode = await QRCode.toDataURL(qrData);

        // Update booking
        booking.status = 'confirmed';
        booking.paymentStatus = 'completed';
        booking.paymentIntentId = paymentIntentId;
        booking.qrCode = qrCode;

        await booking.save();

        // Add booking to user
        await User.findByIdAndUpdate(booking.user, {
            $push: { bookings: booking._id }
        });

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id })
            .populate('event')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('event')
            .populate('user', 'name email');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Check if booking belongs to user or user is admin
        if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this booking'
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all bookings (admin)
// @route   GET /api/bookings
// @access  Private/Admin
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('event', 'title date venue')
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('event');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Check if booking belongs to user
        if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to cancel this booking'
            });
        }

        // Don't allow cancellation if event is in the past or within 24 hours
        const eventDate = new Date(booking.event.date);
        const now = new Date();
        const hoursDiff = (eventDate - now) / (1000 * 60 * 60);

        if (hoursDiff < 24) {
            return res.status(400).json({
                success: false,
                message: 'Cannot cancel booking less than 24 hours before event'
            });
        }

        // Restore event seats if booking was confirmed
        if (booking.status === 'confirmed') {
            const event = await Event.findById(booking.event._id);
            event.availableSeats += booking.numberOfTickets;
            await event.save();
        }

        // Update booking status
        booking.status = 'cancelled';
        await booking.save();

        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully',
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get booking statistics (admin)
// @route   GET /api/bookings/stats
// @access  Private/Admin
export const getBookingStats = async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments();
        const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
        const cancelledBookings = await Booking.countDocuments({ status: 'cancelled' });

        const revenueResult = await Booking.aggregate([
            { $match: { paymentStatus: 'completed' } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);

        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        res.status(200).json({
            success: true,
            data: {
                totalBookings,
                confirmedBookings,
                cancelledBookings,
                totalRevenue
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
