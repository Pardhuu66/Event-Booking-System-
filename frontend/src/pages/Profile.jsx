import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authAPI.updateProfile(formData);
            updateUser(response.data.data);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <div className="container">
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h1>My Profile</h1>

                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={user?.email}
                                    disabled
                                    style={{ background: 'var(--gray-100)' }}
                                />
                                <small style={{ color: 'var(--gray-500)' }}>Email cannot be changed</small>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Role</label>
                                <span className={`badge badge-${user?.role === 'admin' ? 'danger' : 'primary'}`}>
                                    {user?.role}
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                                style={{ width: '100%' }}
                            >
                                {loading ? 'Updating...' : 'Update Profile'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
