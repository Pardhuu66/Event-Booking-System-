import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingAPI, eventAPI } from '../../services/api';
import { MdEvent, MdConfirmationNumber, MdAttachMoney, MdPeople } from 'react-icons/md';
import Loader from '../../components/Loader';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [bookingStats, eventsResponse] = await Promise.all([
                bookingAPI.getBookingStats(),
                eventAPI.getAllEvents()
            ]);

            setStats({
                ...bookingStats.data.data,
                totalEvents: eventsResponse.data.count
            });
        } catch (error) {
            console.error('Failed to fetch stats');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader fullScreen />;

    return (
        <div className="page">
            <div className="container">
                <div style={{ marginBottom: '2rem' }}>
                    <h1>Admin Dashboard</h1>
                    <p>Manage events and bookings</p>
                </div>

                <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
                    <div className="card" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
                        <MdEvent style={{ fontSize: '2.5rem', marginBottom: '1rem' }} />
                        <h3>{stats?.totalEvents || 0}</h3>
                        <p>Total Events</p>
                    </div>

                    <div className="card" style={{ background: 'var(--gradient-success)', color: 'white' }}>
                        <MdConfirmationNumber style={{ fontSize: '2.5rem', marginBottom: '1rem' }} />
                        <h3>{stats?.totalBookings || 0}</h3>
                        <p>Total Bookings</p>
                    </div>

                    <div className="card" style={{ background: 'var(--gradient-secondary)', color: 'white' }}>
                        <MdPeople style={{ fontSize: '2.5rem', marginBottom: '1rem' }} />
                        <h3>{stats?.confirmedBookings || 0}</h3>
                        <p>Confirmed Bookings</p>
                    </div>

                    <div className="card" style={{ background: 'var(--gradient-warm)', color: 'white' }}>
                        <MdAttachMoney style={{ fontSize: '2.5rem', marginBottom: '1rem' }} />
                        <h3>₹{stats?.totalRevenue || 0}</h3>
                        <p>Total Revenue</p>
                    </div>
                </div>

                <div className="grid grid-2">
                    <Link to="/admin/events/create" className="card" style={{ textAlign: 'center', padding: '2rem', textDecoration: 'none' }}>
                        <MdEvent style={{ fontSize: '3rem', color: 'var(--primary-600)' }} />
                        <h3>Create New Event</h3>
                        <p>Add a new event to the platform</p>
                    </Link>

                    <Link to="/admin/events" className="card" style={{ textAlign: 'center', padding: '2rem', textDecoration: 'none' }}>
                        <MdEvent style={{ fontSize: '3rem', color: 'var(--secondary-600)' }} />
                        <h3>Manage Events</h3>
                        <p>View and edit existing events</p>
                    </Link>

                    <Link to="/admin/bookings" className="card" style={{ textAlign: 'center', padding: '2rem', textDecoration: 'none' }}>
                        <MdConfirmationNumber style={{ fontSize: '3rem', color: 'var(--success-600)' }} />
                        <h3>View Bookings</h3>
                        <p>See all customer bookings</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
