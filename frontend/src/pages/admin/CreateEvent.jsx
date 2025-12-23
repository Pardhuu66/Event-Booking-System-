import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventAPI } from '../../services/api';
import { toast } from 'react-toastify';

const CreateEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'concert',
        venue: '',
        city: '',
        date: '',
        time: '',
        price: '',
        totalSeats: '',
        image: '',
        organizer: 'Event Booking System',
        featured: false
    });

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await eventAPI.createEvent({
                ...formData,
                price: parseFloat(formData.price),
                totalSeats: parseInt(formData.totalSeats)
            });

            toast.success('Event created successfully');
            navigate('/admin/events');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create event');
        }
    };

    return (
        <div className="page">
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1>Create New Event</h1>

                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Event Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-input"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Description *</label>
                                <textarea
                                    name="description"
                                    className="form-textarea"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid grid-2">
                                <div className="form-group">
                                    <label className="form-label">Category *</label>
                                    <select name="category" className="form-select" value={formData.category} onChange={handleChange} required>
                                        <option value="concert">Concert</option>
                                        <option value="conference">Conference</option>
                                        <option value="sports">Sports</option>
                                        <option value="theater">Theater</option>
                                        <option value="workshop">Workshop</option>
                                        <option value="festival">Festival</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        className="form-input"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Venue *</label>
                                <input
                                    type="text"
                                    name="venue"
                                    className="form-input"
                                    value={formData.venue}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid grid-2">
                                <div className="form-group">
                                    <label className="form-label">Date *</label>
                                    <input
                                        type="date"
                                        name="date"
                                        className="form-input"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Time *</label>
                                    <input
                                        type="time"
                                        name="time"
                                        className="form-input"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-2">
                                <div className="form-group">
                                    <label className="form-label">Price (₹) *</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="form-input"
                                        value={formData.price}
                                        onChange={handleChange}
                                        min="0"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Total Seats *</label>
                                    <input
                                        type="number"
                                        name="totalSeats"
                                        className="form-input"
                                        value={formData.totalSeats}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Image URL</label>
                                <input
                                    type="url"
                                    name="image"
                                    className="form-input"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Organizer</label>
                                <input
                                    type="text"
                                    name="organizer"
                                    className="form-input"
                                    value={formData.organizer}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                    />
                                    <span>Featured Event</span>
                                </label>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                    Create Event
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => navigate('/admin/events')}
                                    style={{ flex: 1 }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
