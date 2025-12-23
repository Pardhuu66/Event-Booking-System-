import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Load user from localStorage on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    // Register function
    const register = async (userData) => {
        try {
            const response = await authAPI.register(userData);
            const { data, token } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(data));

            setUser(data);
            setIsAuthenticated(true);

            toast.success('Registration successful!');
            return { success: true, data };
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
            return { success: false, message };
        }
    };

    // Login function
    const login = async (credentials) => {
        try {
            const response = await authAPI.login(credentials);
            const { data, token } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(data));

            setUser(data);
            setIsAuthenticated(true);

            toast.success('Login successful!');
            return { success: true, data };
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            return { success: false, message };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        toast.info('Logged out successfully');
    };

    // Update user profile
    const updateUser = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    // Check if user is admin
    const isAdmin = () => {
        return user?.role === 'admin';
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        register,
        login,
        logout,
        updateUser,
        isAdmin
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
