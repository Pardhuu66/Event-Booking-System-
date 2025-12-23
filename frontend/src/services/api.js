import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me'),
    updateProfile: (data) => api.put('/auth/profile', data),
    logout: () => api.post('/auth/logout')
};

// Event APIs
export const eventAPI = {
    getAllEvents: (params) => api.get('/events', { params }),
    getEvent: (id) => api.get(`/events/${id}`),
    createEvent: (data) => api.post('/events', data),
    updateEvent: (id, data) => api.put(`/events/${id}`, data),
    deleteEvent: (id) => api.delete(`/events/${id}`),
    getCategories: () => api.get('/events/categories')
};

// Booking APIs
export const bookingAPI = {
    createBooking: (data) => api.post('/bookings', data),
    confirmBooking: (id, data) => api.post(`/bookings/${id}/confirm`, data),
    getMyBookings: () => api.get('/bookings/my-bookings'),
    getBooking: (id) => api.get(`/bookings/${id}`),
    getAllBookings: () => api.get('/bookings'),
    cancelBooking: (id) => api.put(`/bookings/${id}/cancel`),
    getBookingStats: () => api.get('/bookings/stats')
};

// Payment APIs
export const paymentAPI = {
    createPaymentIntent: (data) => api.post('/payments/create-payment-intent', data),
    verifyPayment: (data) => api.post('/payments/verify', data)
};

export default api;
