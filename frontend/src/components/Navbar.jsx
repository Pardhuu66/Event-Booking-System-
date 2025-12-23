import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings, FiCalendar } from 'react-icons/fi';
import { MdDashboard, MdEvent } from 'react-icons/md';
import AutocompleteSearch from './AutocompleteSearch';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { isAuthenticated, user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
    };

    const handleSearch = (query) => {
        if (query.trim()) {
            navigate(`/events?search=${encodeURIComponent(query)}`);
        }
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo">
                        <MdEvent className="logo-icon" />
                        <span className="logo-text"><span className="event-word">Event</span><span className="text-gradient">Book</span></span>
                    </Link>

                    {/* Autocomplete Search */}
                    <div className="navbar-search">
                        <AutocompleteSearch
                            onSearch={handleSearch}
                            placeholder="Search events..."
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="navbar-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/events" className="nav-link">Browse Events</Link>
                        {isAuthenticated && (
                            <Link to="/my-bookings" className="nav-link">My Bookings</Link>
                        )}
                        {isAdmin() && (
                            <Link to="/admin/dashboard" className="nav-link admin-link">
                                <MdDashboard /> Admin
                            </Link>
                        )}
                    </div>

                    {/* Auth Buttons / User Menu */}
                    <div className="navbar-actions">
                        {isAuthenticated ? (
                            <div className="user-menu-wrapper">
                                <button
                                    className="user-menu-trigger"
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                >
                                    <FiUser />
                                    <span>{user?.name}</span>
                                </button>

                                {showUserMenu && (
                                    <div className="user-menu-dropdown">
                                        <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                                            <FiSettings /> Profile
                                        </Link>
                                        <Link to="/my-bookings" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                                            <FiCalendar /> My Bookings
                                        </Link>
                                        {isAdmin() && (
                                            <Link to="/admin/dashboard" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                                                <MdDashboard /> Admin Dashboard
                                            </Link>
                                        )}
                                        <button className="dropdown-item logout-btn" onClick={handleLogout}>
                                            <FiLogOut /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="auth-buttons">
                                <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
                                <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="mobile-menu-btn" onClick={toggleMenu}>
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="mobile-menu">
                        <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>Home</Link>
                        <Link to="/events" className="mobile-nav-link" onClick={toggleMenu}>Browse Events</Link>
                        {isAuthenticated && (
                            <>
                                <Link to="/my-bookings" className="mobile-nav-link" onClick={toggleMenu}>My Bookings</Link>
                                <Link to="/profile" className="mobile-nav-link" onClick={toggleMenu}>Profile</Link>
                                {isAdmin() && (
                                    <Link to="/admin/dashboard" className="mobile-nav-link" onClick={toggleMenu}>Admin Dashboard</Link>
                                )}
                                <button className="mobile-nav-link logout-mobile" onClick={handleLogout}>
                                    <FiLogOut /> Logout
                                </button>
                            </>
                        )}
                        {!isAuthenticated && (
                            <>
                                <Link to="/login" className="mobile-nav-link" onClick={toggleMenu}>Login</Link>
                                <Link to="/register" className="mobile-nav-link" onClick={toggleMenu}>Sign Up</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
