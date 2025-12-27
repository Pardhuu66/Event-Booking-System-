import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './FeaturedEvents.css';

const FeaturedEvents = () => {
    const [featuredEvents, setFeaturedEvents] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedEvents();
    }, []);

    const fetchFeaturedEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events/featured');
            setFeaturedEvents(response.data.data || []);
        } catch (error) {
            console.error('Error fetching featured events:', error);
        } finally {
            setLoading(false);
        }
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % Math.max(1, featuredEvents.length - 2));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + Math.max(1, featuredEvents.length - 2)) % Math.max(1, featuredEvents.length - 2));
    };

    if (loading) {
        return (
            <div className="featured-section">
                <div className="container">
                    <h2 className="featured-title">✨ Featured Events</h2>
                    <div className="featured-loading">Loading featured events...</div>
                </div>
            </div>
        );
    }

    if (!featuredEvents.length) return null;

    return (
        <div className="featured-section">
            <div className="container">
                <div className="featured-header">
                    <h2 className="featured-title">✨ Featured Events</h2>
                    <p className="featured-subtitle">Don't miss out on these handpicked amazing events</p>
                </div>

                <div className="featured-carousel">
                    <button onClick={prevSlide} className="carousel-btn carousel-btn-prev" aria-label="Previous">
                        <FiChevronLeft />
                    </button>

                    <div className="featured-events-container">
                        <div
                            className="featured-events-track"
                            style={{
                                transform: `translateX(-${currentIndex * 33.33}%)`
                            }}
                        >
                            {featuredEvents.map((event) => (
                                <Link
                                    key={event._id}
                                    to={`/events/${event._id}`}
                                    className="featured-event-card"
                                >
                                    <div className="featured-event-image">
                                        <img src={event.image} alt={event.title} />
                                        <div className="featured-badge">Featured</div>
                                        <div className="category-badge">{event.category}</div>
                                    </div>
                                    <div className="featured-event-content">
                                        <h3 className="featured-event-title">{event.title}</h3>
                                        <p className="featured-event-description">
                                            {event.description.substring(0, 100)}...
                                        </p>
                                        <div className="featured-event-details">
                                            <span className="event-date">
                                                {new Date(event.date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                            <span className="event-location">📍 {event.city}</span>
                                        </div>
                                        <div className="featured-event-footer">
                                            <span className="event-price">
                                                {event.price === 0 ? 'Free' : `₹${event.price}`}
                                            </span>
                                            <span className="book-now-btn">Book Now →</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <button onClick={nextSlide} className="carousel-btn carousel-btn-next" aria-label="Next">
                        <FiChevronRight />
                    </button>
                </div>

                <div className="carousel-indicators">
                    {Array.from({ length: Math.max(1, featuredEvents.length - 2) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`indicator ${index === currentIndex ? 'active' : ''}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedEvents;
