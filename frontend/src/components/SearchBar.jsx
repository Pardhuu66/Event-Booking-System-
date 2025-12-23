import { useState } from 'react';
import { FiSearch, FiMapPin, FiX } from 'react-icons/fi';
import './SearchBar.css';

const SearchBar = ({ onSearch, onCategoryChange, onLocationChange, onClear }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [location, setLocation] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        onCategoryChange(category);
    };

    const handleLocationChange = (e) => {
        const loc = e.target.value;
        setLocation(loc);
        onLocationChange(loc);
    };

    const handleClear = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setLocation('');
        onClear();
    };

    const hasActiveFilters = searchQuery || selectedCategory || location;

    return (
        <div className="search-bar-wrapper">
            <form onSubmit={handleSearch} className="search-bar">
                <div className="search-input-group">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search events by name, organizer..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            onSearch(e.target.value);
                        }}
                        className="search-input"
                    />
                </div>

                <div className="filter-group">
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="filter-select"
                    >
                        <option value="">All Categories</option>
                        <option value="concert">🎵 Concerts</option>
                        <option value="conference">🎤 Conferences</option>
                        <option value="sports">🏏 Sports</option>
                        <option value="theater">🎭 Theater</option>
                        <option value="workshop">🛠️ Workshops</option>
                        <option value="festival">🎉 Festivals</option>
                        <option value="tech-meetup">💻 Tech Meetups</option>
                        <option value="cultural">🎨 Cultural Events</option>
                    </select>
                </div>

                <div className="filter-group">
                    <FiMapPin className="filter-icon" />
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={handleLocationChange}
                        className="filter-input"
                    />
                </div>

                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="clear-filters-btn"
                        title="Clear all filters"
                    >
                        <FiX /> Clear
                    </button>
                )}
            </form>
        </div>
    );
};

export default SearchBar;
