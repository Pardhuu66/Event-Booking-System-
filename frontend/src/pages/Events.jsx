import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import FeaturedEvents from '../components/FeaturedEvents';
import EventCard from '../components/EventCard';
import EventCardSkeletonGrid from '../components/EventCardSkeleton';
import './Events.css';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        filterEvents();
    }, [events, searchQuery, selectedCategory, selectedLocation]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/events');
            setEvents(response.data.data || []);
            setFilteredEvents(response.data.data || []);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterEvents = () => {
        let filtered = [...events];

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.organizer.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory) {
            filtered = filtered.filter(event => event.category === selectedCategory);
        }

        // Location filter
        if (selectedLocation) {
            filtered = filtered.filter(event =>
                event.city.toLowerCase().includes(selectedLocation.toLowerCase()) ||
                event.venue.toLowerCase().includes(selectedLocation.toLowerCase())
            );
        }

        setFilteredEvents(filtered);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleLocationChange = (location) => {
        setSelectedLocation(location);
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setSelectedLocation('');
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        // Scroll to events grid
        document.getElementById('events-grid-section')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    return (
        <div className="events-page">
            {/* Hero Section */}
            <section className="events-hero">
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <h1 className="hero-title">
                        Discover Events That Matter to You
                    </h1>
                    <p className="hero-subtitle">
                        From concerts and conferences to workshops and festivals - find your next unforgettable experience
                    </p>

                    <SearchBar
                        onSearch={handleSearch}
                        onCategoryChange={handleCategoryChange}
                        onLocationChange={handleLocationChange}
                        onClear={handleClearFilters}
                    />
                </div>
            </section>

            {/* Featured Events Carousel */}
            <FeaturedEvents />

            {/* Category Filter Section */}
            <section className="category-section">
                <div className="container">
                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        onCategorySelect={handleCategorySelect}
                    />
                </div>
            </section>

            {/* Events Grid Section */}
            <section id="events-grid-section" className="events-grid-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">
                            {selectedCategory
                                ? `${selectedCategory.replace('-', ' ')} Events`
                                : 'All Events'}
                        </h2>
                        <p className="section-subtitle">
                            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
                        </p>
                    </div>

                    {loading ? (
                        <div className="events-grid">
                            <EventCardSkeletonGrid count={6} />
                        </div>
                    ) : filteredEvents.length > 0 ? (
                        <div className="events-grid">
                            {filteredEvents.map(event => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-events">
                            <div className="no-events-icon">🔍</div>
                            <h3>No Events Found</h3>
                            <p>Try adjusting your search or filters to find what you're looking for.</p>
                            <button onClick={handleClearFilters} className="btn btn-primary">
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Events;
