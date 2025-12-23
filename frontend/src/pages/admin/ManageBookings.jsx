import { useState, useEffect } from 'react';
import { bookingAPI } from '../../services/api';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await bookingAPI.getAllBookings();
            setBookings(response.data.data);
        } catch (error) {
            toast.error('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullScreen />;

    return (
        <div className="page">
            <div className="container">
                <h1>All Bookings</h1>

                <div className="card">
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--gray-200)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>Event</th>
                                    <th style={{ padding: '1rem' }}>Customer</th>
                                    <th style={{ padding: '1rem' }}>Tickets</th>
                                    <th style={{ padding: '1rem' }}>Amount</th>
                                    <th style={{ padding: '1rem' }}>Status</th>
                                    <th style={{ padding: '1rem' }}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking._id} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                                        <td style={{ padding: '1rem' }}>{booking.event?.title || 'N/A'}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <div>
                                                <div>{booking.user?.name || 'N/A'}</div>
                                                <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                                                    {booking.user?.email || 'N/A'}
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>{booking.numberOfTickets}</td>
                                        <td style={{ padding: '1rem' }}>₹{booking.totalPrice}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span className={`badge badge-${booking.status === 'confirmed' ? 'success' : booking.status === 'cancelled' ? 'danger' : 'warning'}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            {format(new Date(booking.createdAt), 'PP')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageBookings;
