import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import { FiSearch, FiCalendar } from 'react-icons/fi';
import './Home.css';

const Home = () => {
    const { events, loading } = useEvents();
    const { user, isAuthenticated } = useAuth();

    const featuredEvents = events.filter(event => event.featured).slice(0, 3);
    const upcomingEvents = events.slice(0, 6);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        {isAuthenticated && user && (
                            <p className="hero-greeting">
                                Hello 👋🏻, Welcome {user.name}
                            </p>
                        )}
                        <h1 className="hero-title fade-in">
                            Discover Amazing <span className="event-word">Events</span> Near You
                        </h1>
                        <p className="hero-subtitle slide-in">
                            Book tickets for concerts, conferences, sports events, and more. Your next memorable experience is just a click away.
                        </p>
                        <div className="hero-actions">
                            <Link to="/events" className="btn btn-primary btn-lg">
                                <FiSearch /> Browse Events
                            </Link>
                            <Link to="/events?featured=true" className="btn btn-secondary btn-lg">
                                <FiCalendar /> Featured Events
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Events */}
            {featuredEvents.length > 0 && (
                <section className="featured-section">
                    <div className="container">
                        <div className="section-header">
                            <h2>✨ Featured Events</h2>
                            <p>Don't miss out on these handpicked amazing events</p>
                        </div>
                        {loading ? (
                            <Loader />
                        ) : (
                            <div className="grid grid-3">
                                {featuredEvents.map(event => (
                                    <EventCard key={event._id} event={event} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Categories */}
            <section className="categories-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Browse by Category</h2>
                        <p>Find events that match your interests</p>
                    </div>
                    <div className="categories-grid">
                        {['concert', 'conference', 'sports', 'theater', 'workshop', 'festival'].map(category => (
                            <Link
                                key={category}
                                to={`/events?category=${category}`}
                                className="category-card"
                            >
                                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}s</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="upcoming-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Upcoming Events</h2>
                        <p>Get your tickets before they're sold out</p>
                        <Link to="/events" className="view-all-link">View All →</Link>
                    </div>
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="grid grid-3">
                            {upcomingEvents.map(event => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
