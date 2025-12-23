import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiCheckCircle, FiCalendar, FiMapPin, FiMail, FiDownload } from 'react-icons/fi';
import './BookingSuccess.css';

const BookingSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { booking } = location.state || {};

    useEffect(() => {
        if (!booking) {
            navigate('/my-bookings');
        }
    }, [booking, navigate]);

    if (!booking) {
        return null;
    }

    const downloadQRCode = () => {
        const link = document.createElement('a');
        link.href = booking.qrCode;
        link.download = `booking-${booking.id}-qr-code.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="page booking-success-page">
            <div className="container">
                <div className="success-wrapper">
                    <div className="success-header">
                        <div className="success-icon">
                            <FiCheckCircle />
                        </div>
                        <h1>Booking Confirmed!</h1>
                        <p className="success-message">
                            Your payment was successful and your tickets have been booked.
                        </p>
                    </div>

                    <div className="booking-details-card card">
                        <h2>Booking Details</h2>

                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">Event</span>
                                <span className="detail-value">{booking.event.title}</span>
                            </div>

                            <div className="detail-item">
                                <FiCalendar className="detail-icon" />
                                <div>
                                    <span className="detail-label">Date & Time</span>
                                    <span className="detail-value">
                                        {new Date(booking.event.date).toLocaleDateString()} at {booking.event.time || 'TBD'}
                                    </span>
                                </div>
                            </div>

                            <div className="detail-item">
                                <FiMapPin className="detail-icon" />
                                <div>
                                    <span className="detail-label">Venue</span>
                                    <span className="detail-value">
                                        {booking.event.venue}, {booking.event.city}
                                    </span>
                                </div>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">Number of Tickets</span>
                                <span className="detail-value">{booking.numberOfTickets}</span>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">Total Paid</span>
                                <span className="detail-value highlight">${booking.totalPrice}</span>
                            </div>

                            <div className="detail-item">
                                <FiMail className="detail-icon" />
                                <div>
                                    <span className="detail-label">Attendee Email</span>
                                    <span className="detail-value">{booking.attendeeEmail}</span>
                                </div>
                            </div>
                        </div>

                        {booking.qrCode && (
                            <div className="qr-code-section">
                                <h3>Your Ticket QR Code</h3>
                                <div className="qr-code-wrapper">
                                    <img src={booking.qrCode} alt="Booking QR Code" />
                                </div>
                                <button
                                    onClick={downloadQRCode}
                                    className="btn btn-outline"
                                >
                                    <FiDownload /> Download QR Code
                                </button>
                                <p className="qr-info">
                                    Show this QR code at the event entrance
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="success-actions">
                        <Link to="/my-bookings" className="btn btn-primary btn-lg">
                            View All Bookings
                        </Link>
                        <Link to="/events" className="btn btn-outline btn-lg">
                            Browse More Events
                        </Link>
                    </div>

                    <div className="confirmation-notice">
                        <FiMail />
                        <p>
                            A confirmation email has been sent to <strong>{booking.attendeeEmail}</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccess;
