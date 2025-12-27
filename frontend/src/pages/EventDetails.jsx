import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { FiCalendar, FiMapPin, FiUsers, FiClock, FiArrowLeft, FiUser } from 'react-icons/fi';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import './EventDetails.css';

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
        <div className="page event-details-page">
            <div className="container">
                {/* Hero Section */}
                <div className="event-hero-section">
                    <img src={event.image} alt={event.title} className="event-hero-bg" />
                    <div className="event-hero-overlay">
                        <Link to="/events" className="back-btn">
                            <FiArrowLeft /> Back to Events
                        </Link>

                        <div className="event-hero-content">
                            <div className="event-badges">
                                <span className="hero-badge">{event.category}</span>
                                {event.featured && <span className="hero-badge featured">✨ Featured</span>}
                            </div>
                            <h1 className="event-hero-title">{event.title}</h1>
                            <div className="event-organizer-hero">
                                <FiUser /> <span>Organized by <strong>{event.organizer}</strong></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="event-content-wrapper">
                    {/* Main Content */}
                    <div className="event-main-info">
                        <div className="event-info-grid">
                            <div className="info-card">
                                <div className="info-icon-wrapper">
                                    <FiCalendar />
                                </div>
                                <div className="info-content">
                                    <h4>Date</h4>
                                    <p>{format(new Date(event.date), 'EEEE, MMM dd, yyyy')}</p>
                                </div>
                            </div>
                            <div className="info-card">
                                <div className="info-icon-wrapper">
                                    <FiClock />
                                </div>
                                <div className="info-content">
                                    <h4>Time</h4>
                                    <p>{event.time}</p>
                                </div>
                            </div>
                            <div className="info-card">
                                <div className="info-icon-wrapper">
                                    <FiMapPin />
                                </div>
                                <div className="info-content">
                                    <h4>Venue</h4>
                                    <p>{event.venue}, {event.city}</p>
                                </div>
                            </div>
                            <div className="info-card">
                                <div className="info-icon-wrapper">
                                    <FiUsers />
                                </div>
                                <div className="info-content">
                                    <h4>Availability</h4>
                                    <p>{event.availableSeats} / {event.totalSeats} seats</p>
                                </div>
                            </div>
                        </div>

                        <div className="event-description-box">
                            <h3 className="section-title">About This Event</h3>
                            <p className="description-text">{event.description}</p>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="sticky-booking-sidebar">
                        <div className="booking-card-premium">
                            <div className="price-header">
                                <span className="price-label">Price per person</span>
                                <span className="price-amount">₹{event.price}</span>
                            </div>

                            {!isSoldOut ? (
                                <>
                                    <div className="ticket-selector-box">
                                        <label className="ticket-label">Select Tickets</label>
                                        <div className="ticket-control">
                                            <input
                                                type="number"
                                                min="1"
                                                max={event.availableSeats}
                                                value={tickets}
                                                onChange={(e) => setTickets(Math.min(Math.max(1, parseInt(e.target.value) || 1), event.availableSeats))}
                                                className="ticket-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="total-row">
                                        <span>Total Amount</span>
                                        <span>₹{event.price * tickets}</span>
                                    </div>

                                    <button
                                        className="btn btn-primary book-btn"
                                        onClick={handleBookNow}
                                    >
                                        Book Tickets Now
                                    </button>
                                </>
                            ) : (
                                <div className="sold-out-box">
                                    ⚠️ This event is officially sold out!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
