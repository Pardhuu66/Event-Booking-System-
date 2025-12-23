import { createContext, useState, useContext, useEffect } from 'react';
import { eventAPI } from '../services/api';
import { toast } from 'react-toastify';

const EventContext = createContext();

export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvents must be used within EventProvider');
    }
    return context;
};

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        category: 'all',
        search: '',
        city: '',
        date: '',
        featured: false
    });

    // Fetch events
    const fetchEvents = async (customFilters = {}) => {
        try {
            setLoading(true);
            const params = { ...filters, ...customFilters };

            // Remove empty filters
            Object.keys(params).forEach(key => {
                if (!params[key] || params[key] === 'all') {
                    delete params[key];
                }
            });

            const response = await eventAPI.getAllEvents(params);
            setEvents(response.data.data);
        } catch (error) {
            console.error('Error fetching events:', error);
            toast.error('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await eventAPI.getCategories();
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Fetch single event
    const fetchEvent = async (id) => {
        try {
            setLoading(true);
            const response = await eventAPI.getEvent(id);
            return response.data.data;
        } catch (error) {
            toast.error('Failed to load event details');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Update filters
    const updateFilters = (newFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    // Reset filters
    const resetFilters = () => {
        setFilters({
            category: 'all',
            search: '',
            city: '',
            date: '',
            featured: false
        });
    };

    // Initial fetch
    useEffect(() => {
        fetchEvents();
        fetchCategories();
    }, []);

    // Refetch when filters change
    useEffect(() => {
        fetchEvents();
    }, [filters]);

    const value = {
        events,
        loading,
        categories,
        filters,
        fetchEvents,
        fetchEvent,
        updateFilters,
        resetFilters
    };

    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    );
};
