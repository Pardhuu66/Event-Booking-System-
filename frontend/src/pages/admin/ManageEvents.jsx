import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import Loader from '../../components/Loader';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await eventAPI.getAllEvents();
            setEvents(response.data.data);
        } catch (error) {
            toast.error('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
            await eventAPI.deleteEvent(id);
            toast.success('Event deleted successfully');
            fetchEvents();
        } catch (error) {
            toast.error('Failed to delete event');
        }
    };

    if (loading) return <Loader fullScreen />;

    return (
        <div className="page">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1>Manage Events</h1>
                    <Link to="/admin/events/create" className="btn btn-primary">
                        <FiPlus /> Create Event
                    </Link>
                </div>

                <div className="card">
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--gray-200)', textAlign: 'left' }}>
                                    <th style={{ padding: '1rem' }}>Title</th>
                                    <th style={{ padding: '1rem' }}>Category</th>
                                    <th style={{ padding: '1rem' }}>Date</th>
                                    <th style={{ padding: '1rem' }}>Price</th>
                                    <th style={{ padding: '1rem' }}>Seats</th>
                                    <th style={{ padding: '1rem' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map(event => (
                                    <tr key={event._id} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                                        <td style={{ padding: '1rem' }}>{event.title}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span className="badge badge-primary">{event.category}</span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>{new Date(event.date).toLocaleDateString()}</td>
                                        <td style={{ padding: '1rem' }}>₹{event.price}</td>
                                        <td style={{ padding: '1rem' }}>{event.availableSeats}/{event.totalSeats}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <Link to={`/admin/events/edit/${event._id}`} className="btn btn-sm btn-outline">
                                                    <FiEdit />
                                                </Link>
                                                <button onClick={() => handleDelete(event._id)} className="btn btn-sm btn-danger">
                                                    <FiTrash2 />
                                                </button>
                                            </div>
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

export default ManageEvents;
