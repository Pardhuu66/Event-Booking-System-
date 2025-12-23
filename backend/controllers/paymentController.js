import paypalClient from '../config/paypal.js';
import paypal from '@paypal/checkout-server-sdk';
import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import QRCode from 'qrcode';

// @desc    Create PayPal order
// @route   POST /api/payments/create-order
// @access  Private
export const createPayPalOrder = async (req, res) => {
    try {
        const { eventId, numberOfTickets, attendeeName, attendeeEmail, attendeePhone } = req.body;

        // Validate input
        if (!eventId || !numberOfTickets || !attendeeName || !attendeeEmail) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Get event details
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }

        // Check if event is available for booking
        if (event.status !== 'upcoming') {
            return res.status(400).json({
                success: false,
                message: 'Event is not available for booking'
            });
        }

        // Check if event date has passed
        if (new Date(event.date) < new Date()) {
            return res.status(400).json({
                success: false,
                message: 'Event date has passed'
            });
        }

        // Check seat availability
        if (event.availableSeats < numberOfTickets) {
            return res.status(400).json({
                success: false,
                message: `Only ${event.availableSeats} seats available`
            });
        }

        // Calculate total price
        const totalPrice = event.price * numberOfTickets;

        // Create booking in pending state
        const booking = await Booking.create({
            user: req.user.id,
            event: eventId,
            numberOfTickets,
            totalPrice,
            paymentStatus: 'pending',
            status: 'pending',
            attendeeName,
            attendeeEmail,
            attendeePhone: attendeePhone || ''
        });

        // Create PayPal order
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                reference_id: booking._id.toString(),
                description: `${event.title} - ${numberOfTickets} ticket(s)`,
                amount: {
                    currency_code: 'USD', // PayPal sandbox typically uses USD
                    value: totalPrice.toFixed(2),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: totalPrice.toFixed(2)
                        }
                    }
                },
                items: [{
                    name: event.title,
                    description: event.description.substring(0, 127),
                    unit_amount: {
                        currency_code: 'USD',
                        value: event.price.toFixed(2)
                    },
                    quantity: numberOfTickets.toString()
                }]
            }],
            application_context: {
                brand_name: 'EventBook',
                landing_page: 'NO_PREFERENCE',
                user_action: 'PAY_NOW',
                return_url: `${process.env.FRONTEND_URL}/booking-success`,
                cancel_url: `${process.env.FRONTEND_URL}/booking-cancelled`
            }
        });

        const order = await paypalClient().execute(request);

        // Update booking with PayPal order ID
        booking.paypalOrderId = order.result.id;
        await booking.save();

        res.status(200).json({
            success: true,
            orderId: order.result.id,
            bookingId: booking._id
        });

    } catch (error) {
        console.error('Create PayPal order error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating PayPal order'
        });
    }
};

// @desc    Capture PayPal payment
// @route   POST /api/payments/capture-order
// @access  Private
export const capturePayPalOrder = async (req, res) => {
    try {
        const { orderId, bookingId } = req.body;

        if (!orderId || !bookingId) {
            return res.status(400).json({
                success: false,
                message: 'Order ID and Booking ID are required'
            });
        }

        // Get booking
        const booking = await Booking.findById(bookingId).populate('event');
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        // Verify booking belongs to user
        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Unauthorized access to booking'
            });
        }

        // Check if already captured
        if (booking.paymentStatus === 'completed') {
            return res.status(400).json({
                success: false,
                message: 'Payment already completed'
            });
        }

        // Capture the order
        const request = new paypal.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});

        const capture = await paypalClient().execute(request);

        // Check capture status
        if (capture.result.status === 'COMPLETED') {
            const event = booking.event;

            // Check seat availability again (prevent race condition)
            if (event.availableSeats < booking.numberOfTickets) {
                return res.status(400).json({
                    success: false,
                    message: 'Not enough seats available'
                });
            }

            // Update event seats atomically
            await Event.findByIdAndUpdate(
                event._id,
                { $inc: { availableSeats: -booking.numberOfTickets } }
            );

            // Generate QR code
            const qrData = {
                bookingId: booking._id,
                eventId: event._id,
                eventTitle: event.title,
                attendeeName: booking.attendeeName,
                tickets: booking.numberOfTickets,
                date: event.date
            };
            const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

            // Update booking
            booking.paymentStatus = 'completed';
            booking.status = 'confirmed';
            booking.paypalCaptureId = capture.result.purchase_units[0].payments.captures[0].id;
            booking.paymentId = capture.result.id;
            booking.qrCode = qrCode;
            await booking.save();

            // Populate booking for response
            await booking.populate('event user');

            res.status(200).json({
                success: true,
                message: 'Payment captured successfully',
                booking: {
                    id: booking._id,
                    event: {
                        title: event.title,
                        date: event.date,
                        venue: event.venue,
                        city: event.city
                    },
                    numberOfTickets: booking.numberOfTickets,
                    totalPrice: booking.totalPrice,
                    qrCode: booking.qrCode,
                    attendeeName: booking.attendeeName,
                    attendeeEmail: booking.attendeeEmail,
                    bookingDate: booking.bookingDate
                }
            });
        } else {
            // Payment failed
            booking.paymentStatus = 'failed';
            await booking.save();

            res.status(400).json({
                success: false,
                message: 'Payment capture failed',
                status: capture.result.status
            });
        }

    } catch (error) {
        console.error('Capture PayPal order error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error capturing payment'
        });
    }
};

// @desc    Verify payment status
// @route   GET /api/payments/verify/:orderId
// @access  Private
export const verifyPayment = async (req, res) => {
    try {
        const { orderId } = req.params;

        const request = new paypal.orders.OrdersGetRequest(orderId);
        const order = await paypalClient().execute(request);

        res.status(200).json({
            success: true,
            status: order.result.status,
            order: order.result
        });

    } catch (error) {
        console.error('Verify payment error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error verifying payment'
        });
    }
};
