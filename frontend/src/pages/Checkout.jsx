import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalCheckout from '../components/PayPalCheckout';
import { toast } from 'react-toastify';
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';
import axios from 'axios';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { event, tickets } = location.state || {};

    const [formData, setFormData] = useState({
        attendeeName: user?.name || '',
        attendeeEmail: user?.email || '',
        attendeePhone: ''
    });
    const [processing, setProcessing] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [bookingId, setBookingId] = useState(null);

    useEffect(() => {
        if (!event || !tickets) {
            navigate('/events');
            return;
        }

        // Check if user is logged in
        if (!user) {
            toast.error('Please login to continue booking');
            navigate('/login', { state: { from: location } });
        }
    }, [event, tickets, user, navigate, location]);

    if (!event || !tickets || !user) {
        return null;
    }

    const totalAmount = event.price * tickets;

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.attendeeName || !formData.attendeeEmail) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Check for token
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to continue');
            navigate('/login', { state: { from: location } });
            return;
        }

        setProcessing(true);

        try {
            // Create order directly
            const response = await axios.post(
                'http://localhost:5000/api/payments/create-order',
                {
                    eventId: event._id,
                    numberOfTickets: tickets,
                    attendeeName: formData.attendeeName,
                    attendeeEmail: formData.attendeeEmail,
                    attendeePhone: formData.attendeePhone
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                setBookingId(response.data.bookingId);
                setShowPayment(true);
                toast.success('Booking created! Please complete payment.');
            }
        } catch (error) {
            console.error('Error creating booking:', error);

            if (error.response?.status === 401) {
                toast.error('Session expired. Please login again.');
                localStorage.removeItem('token');
                navigate('/login', { state: { from: location } });
            } else {
                toast.error(error.response?.data?.message || 'Failed to create booking');
            }
        } finally {
            setProcessing(false);
        }
    };

    const handlePaymentSuccess = (booking) => {
        toast.success('Payment successful! Your booking is confirmed.');
        navigate('/booking-success', {
            state: { booking }
        });
    };

    const handlePaymentError = (error) => {
        console.error('Payment error:', error);
        toast.error('Payment failed. Please try again.');
    };

    const paypalOptions = {
        'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
        currency: 'USD',
        intent: 'capture'
    };

    return (
        <div className="page">
            <div className="container">
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>Checkout</h1>

                    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)', alignItems: 'start' }}>
                        {/* Event Summary */}
                        <div className="card">
                            <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Event Details</h3>

                            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderRadius: 'var(--radius-md)',
                                        marginBottom: 'var(--spacing-md)'
                                    }}
                                />
                            </div>

                            <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>{event.title}</h4>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-md)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', color: 'var(--gray-600)' }}>
                                    <FiCalendar />
                                    <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', color: 'var(--gray-600)' }}>
                                    <FiMapPin />
                                    <span>{event.venue}, {event.city}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', color: 'var(--gray-600)' }}>
                                    <FiUsers />
                                    <span>{tickets} Ticket(s)</span>
                                </div>
                            </div>

                            <div style={{
                                marginTop: 'var(--spacing-xl)',
                                paddingTop: 'var(--spacing-lg)',
                                borderTop: '2px solid var(--gray-200)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                    <span>Price per ticket:</span>
                                    <span>${event.price}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                                    <span>Number of tickets:</span>
                                    <span>{tickets}</span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    color: 'var(--primary-600)',
                                    marginTop: 'var(--spacing-md)',
                                    paddingTop: 'var(--spacing-md)',
                                    borderTop: '1px solid var(--gray-200)'
                                }}>
                                    <span>Total Amount:</span>
                                    <span>${totalAmount}</span>
                                </div>
                            </div>
                        </div>

                        {/* Attendee Form & Payment */}
                        <div className="card">
                            <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Attendee Information</h3>

                            {!showPayment ? (
                                <form onSubmit={handleFormSubmit}>
                                    <div className="form-group">
                                        <label className="form-label">Full Name *</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={formData.attendeeName}
                                            onChange={(e) => setFormData({ ...formData, attendeeName: e.target.value })}
                                            required
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Email Address *</label>
                                        <input
                                            type="email"
                                            className="form-input"
                                            value={formData.attendeeEmail}
                                            onChange={(e) => setFormData({ ...formData, attendeeEmail: e.target.value })}
                                            required
                                            placeholder="your.email@example.com"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            className="form-input"
                                            value={formData.attendeePhone}
                                            onChange={(e) => setFormData({ ...formData, attendeePhone: e.target.value })}
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        disabled={processing}
                                        style={{ width: '100%', marginTop: 'var(--spacing-lg)' }}
                                    >
                                        {processing ? 'Processing...' : 'Continue to Payment'}
                                    </button>
                                </form>
                            ) : (
                                <div>
                                    <div style={{
                                        padding: 'var(--spacing-md)',
                                        background: 'var(--success-50)',
                                        borderRadius: 'var(--radius-md)',
                                        marginBottom: 'var(--spacing-lg)',
                                        border: '1px solid var(--success-200)'
                                    }}>
                                        <p style={{ margin: 0, color: 'var(--success-700)', fontWeight: 500 }}>
                                            ✓ Booking details confirmed
                                        </p>
                                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: 'var(--success-600)' }}>
                                            Complete payment to finalize your booking
                                        </p>
                                    </div>

                                    <PayPalScriptProvider options={paypalOptions}>
                                        <PayPalCheckout
                                            bookingData={{
                                                eventId: event._id,
                                                numberOfTickets: tickets,
                                                attendeeName: formData.attendeeName,
                                                attendeeEmail: formData.attendeeEmail,
                                                attendeePhone: formData.attendeePhone,
                                                bookingId: bookingId
                                            }}
                                            onSuccess={handlePaymentSuccess}
                                            onError={handlePaymentError}
                                        />
                                    </PayPalScriptProvider>

                                    <p style={{
                                        marginTop: 'var(--spacing-lg)',
                                        fontSize: '0.875rem',
                                        color: 'var(--gray-600)',
                                        textAlign: 'center'
                                    }}>
                                        Secured payment powered by PayPal
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
