import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const result = await login(formData);
        if (result.success) {
            navigate('/');
        }
    };

    return (
        <div className="auth-page">
            <div className="container">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1>Welcome Back</h1>
                        <p>Login to your account to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
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
                                <FiLock /> Password
                            </label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="form-input"
                                    placeholder="Enter your password"
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

                        <button type="submit" className="btn btn-primary btn-lg">
                            Login
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Don't have an account? <Link to="/register">Sign up here</Link></p>
                    </div>

                    <div className="demo-credentials">
                        <p><strong>Demo Credentials:</strong></p>
                        <p>Admin: admin@eventbooking.com / Admin@123</p>
                        <p>User: user@test.com / User@123</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
