import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiUser, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const result = await register(formData);
        if (result.success) {
            navigate('/');
        }
    };

    return (
        <div className="auth-page">
            <div className="container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1>Create Account</h1>
                        <p>Join us to book amazing events</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label className="form-label">
                                <FiUser /> Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <span className="form-error">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <FiMail /> Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className="form-error">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <FiPhone /> Phone (Optional)
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                className="form-input"
                                placeholder="+91 1234567890"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <FiLock /> Password
                            </label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="form-input"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                            {errors.password && <span className="form-error">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <FiLock /> Confirm Password
                            </label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    className="form-input"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                </button>
                            </div>
                            {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg">
                            Sign Up
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Already have an account? <Link to="/login">Login here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
