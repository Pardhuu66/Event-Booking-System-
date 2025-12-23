import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    numberOfTickets: {
        type: Number,
        required: [true, 'Please specify number of tickets'],
        min: [1, 'Must book at least 1 ticket']
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentId: {
        type: String,
        default: ''
    },
    paypalOrderId: {
        type: String,
        default: ''
    },
    paypalCaptureId: {
        type: String,
        default: ''
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['confirmed', 'cancelled', 'pending'],
        default: 'pending'
    },
    qrCode: {
        type: String,
        default: ''
    },
    attendeeName: {
        type: String,
        required: true
    },
    attendeeEmail: {
        type: String,
        required: true
    },
    attendeePhone: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

// Index for faster queries
bookingSchema.index({ user: 1, event: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ status: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
