import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import axios from 'axios';
import './AutocompleteSearch.css';

const AutocompleteSearch = ({ onSearch, placeholder = "Search events..." }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [controller, setController] = useState(null);

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Debounced search
    useEffect(() => {
        if (query.trim().length < 2) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        // Cancel previous request
        if (controller) {
            controller.abort();
        }

        const newController = new AbortController();
        setController(newController);

        const timeoutId = setTimeout(async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    `http://localhost:5000/api/events/search?q=${encodeURIComponent(query)}`,
                    { signal: newController.signal }
                );

                setSuggestions(response.data.data || []);
                setShowDropdown(true);
                setIsLoading(false);
            } catch (error) {
                if (error.name !== 'CanceledError') {
                    console.error('Search error:', error);
                    setIsLoading(false);
                }
            }
        }, 300); // 300ms debounce

        return () => {
            clearTimeout(timeoutId);
            if (newController) {
                newController.abort();
            }
        };
    }, [query]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                inputRef.current && !inputRef.current.contains(event.target)) {
                setShowDropdown(false);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (!showDropdown || suggestions.length === 0) {
            if (e.key === 'Enter' && onSearch) {
                onSearch(query);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0) {
                    handleSelectSuggestion(suggestions[selectedIndex]);
                } else if (onSearch) {
                    onSearch(query);
                    setShowDropdown(false);
                }
                break;
            case 'Escape':
                setShowDropdown(false);
                setSelectedIndex(-1);
                inputRef.current?.blur();
                break;
            default:
                break;
        }
    };

    const handleSelectSuggestion = (event) => {
        navigate(`/events/${event._id}`);
        setQuery('');
        setSuggestions([]);
        setShowDropdown(false);
        setSelectedIndex(-1);
    };

    const handleClear = () => {
        setQuery('');
        setSuggestions([]);
        setShowDropdown(false);
        setSelectedIndex(-1);
        inputRef.current?.focus();
    };

    const highlightMatch = (text, query) => {
        if (!query) return text;

        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <mark key={index} className="highlight">{part}</mark>
            ) : (
                part
            )
        );
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'concert': '🎵',
            'conference': '🎤',
            'sports': '🏏',
            'theater': '🎭',
            'workshop': '🛠️',
            'festival': '🎉',
            'tech-meetup': '💻',
            'cultural': '🎨'
        };
        return icons[category] || '🎪';
    };

    return (
        <div className="autocomplete-search-wrapper">
            <div className="autocomplete-search-input-wrapper">
                <FiSearch className="autocomplete-search-icon" />
                <input
                    ref={inputRef}
                    type="text"
                    className="autocomplete-search-input"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.length >= 2 && suggestions.length > 0 && setShowDropdown(true)}
                    aria-autocomplete="list"
                    aria-controls="search-suggestions"
                    aria-expanded={showDropdown}
                    role="combobox"
                />
                {query && (
                    <button
                        className="autocomplete-clear-btn"
                        onClick={handleClear}
                        aria-label="Clear search"
                        type="button"
                    >
                        <FiX />
                    </button>
                )}
                {isLoading && <div className="autocomplete-loading-spinner"></div>}
            </div>

            {showDropdown && (
                <div
                    ref={dropdownRef}
                    id="search-suggestions"
                    className="autocomplete-dropdown"
                    role="listbox"
                >
                    {suggestions.length > 0 ? (
                        suggestions.map((event, index) => (
                            <div
                                key={event._id}
                                className={`autocomplete-suggestion-item ${index === selectedIndex ? 'selected' : ''
                                    }`}
                                onClick={() => handleSelectSuggestion(event)}
                                onMouseEnter={() => setSelectedIndex(index)}
                                role="option"
                                aria-selected={index === selectedIndex}
                            >
                                <div className="suggestion-icon">
                                    {getCategoryIcon(event.category)}
                                </div>
                                <div className="suggestion-content">
                                    <div className="suggestion-title">
                                        {highlightMatch(event.title, query)}
                                    </div>
                                    <div className="suggestion-meta">
                                        <span className="suggestion-category">
                                            {event.category}
                                        </span>
                                        <span className="suggestion-separator">•</span>
                                        <span className="suggestion-location">
                                            {event.city}
                                        </span>
                                    </div>
                                </div>
                                {event.featured && (
                                    <span className="suggestion-featured-badge">✨</span>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="autocomplete-no-results">
                            <span>No events found</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AutocompleteSearch;
