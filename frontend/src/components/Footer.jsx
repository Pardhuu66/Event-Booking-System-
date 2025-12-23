import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEvent, MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand Section */}
                    <div className="footer-section">
                        <div className="footer-logo">
                            <MdEvent className="footer-logo-icon" />
                            <span>Event<span className="text-gradient">Book</span></span>
                        </div>
                        <p className="footer-description">
                            Your one-stop platform for booking tickets to the best events, concerts, conferences, and more.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link" aria-label="Facebook">
                                <FaFacebook />
                            </a>
                            <a href="#" className="social-link" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="#" className="social-link" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="#" className="social-link" aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/events">Browse Events</Link></li>
                            <li><Link to="/events?category=concert">Concerts</Link></li>
                            <li><Link to="/events?category=conference">Conferences</Link></li>
                            <li><Link to="/events?category=sports">Sports</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Support</h4>
                        <ul className="footer-links">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/terms">Terms & Conditions</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section">
                        <h4 className="footer-heading">Contact Us</h4>
                        <div className="contact-info">
                            <div className="contact-item">
                                <MdEmail className="contact-icon" />
                                <span>support@eventbook.com</span>
                            </div>
                            <div className="contact-item">
                                <MdPhone className="contact-icon" />
                                <span>+91 123 456 7890</span>
                            </div>
                            <div className="contact-item">
                                <MdLocationOn className="contact-icon" />
                                <span>Mumbai, India</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom">
                    <p>&copy; {currentYear} EventBook. All rights reserved.</p>
                    <p>Made with ❤️ for event enthusiasts</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
