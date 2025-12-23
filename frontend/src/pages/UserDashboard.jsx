import { useState, useEffect } from 'react';
import { bookingAPI } from '../services/api';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const UserDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await bookingAPI.getMyBookings();
            setBookings(response.data.data);
        } catch (error) {
            toast.error('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (bookingId) => {
        if (!confirm('Are you sure you want to cancel this booking?')) return;

        try {
            await bookingAPI.cancelBooking(bookingId);
            toast.success('Booking cancelled successfully');
            fetchBookings();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to cancel booking');
        }
    };

    if (loading) return <Loader fullScreen />;

    return (
        <div className="page">
            <div className="container">
                <h1>My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <h3>No bookings yet</h3>
                        <p>Start exploring events and book your tickets!</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {bookings.map(booking => (
                            <div key={booking._id} className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem', flexWrap: 'wrap' }}>
                                    <div style={{ flex: 1 }}>
                                        <h3>{booking.event?.title || 'Event'}</h3>
                                        <p>Date: {booking.event?.date ? format(new Date(booking.event.date), 'PPP') : 'N/A'}</p>
                                        <p>Tickets: {booking.numberOfTickets}</p>
                                        <p>Total: ₹{booking.totalPrice}</p>
                                        <p>
                                            <span className={`badge badge-${booking.status === 'confirmed' ? 'success' : booking.status === 'cancelled' ? 'danger' : 'warning'}`}>
                                                {booking.status}
                                            </span>
                                        </p>
                                    </div>

                                    {booking.status === 'confirmed' && booking.qrCode && (
                                        <div style={{ textAlign: 'center' }}>
                                            <img src={booking.qrCode} alt="QR Code" style={{ width: '100px', height: '100px' }} />
                                            <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Scan at venue</p>
                                        </div>
                                    )}

                                    {booking.status === 'confirmed' && (
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleCancel(booking._id)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
