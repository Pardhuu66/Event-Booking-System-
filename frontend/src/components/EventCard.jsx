import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiUsers, FiUser } from 'react-icons/fi';
import './EventCard.css';

const EventCard = ({ event }) => {
    const formatDate = (date) => {
        const eventDate = new Date(date);
        return eventDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const isSoldOut = event.availableSeats === 0;

    const getCategoryIcon = (category) => {
        const icons = {
            'concert': '🎵',
            'conference': '🎤',
            'sports': '🏏',
            'theater': '🎭',
            'workshop': '🛠️',
            'festival': '🎉',
            'tech-meetup': '💻',
            'cultural': '🎨',
            'other': '🎪'
        };
        return icons[category] || '🎪';
    };

    return (
        <Link to={`/events/${event._id}`} className="event-card">
            <div className="event-card-image">
                <img src={event.image} alt={event.title} loading="lazy" />
                {isSoldOut && <div className="sold-out-overlay">SOLD OUT</div>}
                {event.featured && !isSoldOut && (
                    <div className="featured-badge-card">✨ Featured</div>
                )}
                <div className="category-badge-card">
                    <span>{getCategoryIcon(event.category)}</span>
                    <span>{event.category.replace('-', ' ')}</span>
                </div>
            </div>

            <div className="event-card-content">
                <h3 className="event-card-title">{event.title}</h3>

                <p className="event-card-description">
                    {event.description.length > 120
                        ? event.description.substring(0, 120) + '...'
                        : event.description}
                </p>

                <div className="event-card-meta">
                    <div className="event-meta-item">
                        <FiCalendar className="meta-icon" />
                        <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="event-meta-item">
                        <FiMapPin className="meta-icon" />
                        <span>{event.city}</span>
                    </div>
                </div>

                <div className="event-card-organizer">
                    <FiUser className="organizer-icon" />
                    <span>by {event.organizer}</span>
                </div>

                <div className="event-card-footer">
                    <div className="event-price-tag">
                        {event.price === 0 ? (
                            <span className="price-free">Free</span>
                        ) : (
                            <>
                                <span className="price-label">From</span>
                                <span className="price-amount">₹{event.price}</span>
                            </>
                        )}
                    </div>
                    <div className="event-seats-info">
                        <FiUsers className="seats-icon" />
                        <span>{event.availableSeats} seats left</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
