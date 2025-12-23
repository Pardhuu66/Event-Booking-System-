import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { FiCalendar, FiMapPin, FiUsers, FiClock, FiDollarSign } from 'react-icons/fi';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchEvent } = useEvents();
    const { isAuthenticated } = useAuth();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tickets, setTickets] = useState(1);

    useEffect(() => {
        loadEvent();
    }, [id]);

    const loadEvent = async () => {
        try {
            const data = await fetchEvent(id);
            setEvent(data);
        } catch (error) {
            toast.error('Failed to load event');
        } finally {
            setLoading(false);
        }
    };

    const handleBookNow = () => {
        if (!isAuthenticated) {
            toast.info('Please login to book tickets');
            navigate('/login');
            return;
        }

        if (tickets > event.availableSeats) {
            toast.error('Not enough seats available');
            return;
        }

        navigate('/checkout', { state: { event, tickets } });
    };

    if (loading) return <Loader fullScreen />;
    if (!event) return <div className="container"><p>Event not found</p></div>;

    const isSoldOut = event.availableSeats === 0;

    return (
        <div className="page">
            <div className="container">
                <div className="event-details-page">
                    <div className="event-image-large">
                        <img src={event.image} alt={event.title} />
                        {event.featured && <span className="badge badge-primary">Featured</span>}
                    </div>

                    <div className="event-details-content">
                        <div className="event-main-info">
                            <span className="badge badge-secondary">{event.category}</span>
                            <h1>{event.title}</h1>
                            <p className="event-organizer">Organized by {event.organizer}</p>

                            <div className="event-info-grid">
                                <div className="info-item">
                                    <FiCalendar className="info-icon" />
                                    <div>
                                        <strong>Date</strong>
                                        <p>{format(new Date(event.date), 'EEEE, MMMM dd, yyyy')}</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <FiClock className="info-icon" />
                                    <div>
                                        <strong>Time</strong>
                                        <p>{event.time}</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <FiMapPin className="info-icon" />
                                    <div>
                                        <strong>Venue</strong>
                                        <p>{event.venue}, {event.city}</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <FiUsers className="info-icon" />
                                    <div>
                                        <strong>Availability</strong>
                                        <p>{event.availableSeats} / {event.totalSeats} seats</p>
                                    </div>
                                </div>
                            </div>

                            <div className="event-description">
                                <h3>About This Event</h3>
                                <p>{event.description}</p>
                            </div>
                        </div>

                        <div className="booking-card card">
                            <div className="price-section">
                                <span className="price-label">Price per ticket</span>
                                <span className="price-value">₹{event.price}</span>
                            </div>

                            {!isSoldOut && (
                                <div className="ticket-selector">
                                    <label>Number of Tickets</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max={event.availableSeats}
                                        value={tickets}
                                        onChange={(e) => setTickets(parseInt(e.target.value) || 1)}
                                        className="form-input"
                                    />
                                </div>
                            )}

                            <div className="total-price">
                                <span>Total:</span>
                                <span>₹{event.price * tickets}</span>
                            </div>

                            <button
                                className={`btn ${isSoldOut ? 'btn-danger' : 'btn-primary'} btn-lg`}
                                onClick={handleBookNow}
                                disabled={isSoldOut}
                                style={{ width: '100%' }}
                            >
                                {isSoldOut ? 'Sold Out' : 'Book Now'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
