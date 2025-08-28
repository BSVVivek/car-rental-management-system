// src/components/Login.jsx

import { useState, useEffect } from 'react';
import { registerUser, loginUser } from '../services/authService';
import './Login.css';

// SVG icon components remain the same
const CarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16.94V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h1.34"/><path d="M18.34 12H22v-3.34a2 2 0 0 0-1-1.73l-2-1.16a2 2 0 0 0-2.26 0l-2 1.16a2 2 0 0 0-1 1.73V12h3.66"/><circle cx="8" cy="17" r="2"/><circle cx="18" cy="17" r="2"/></svg>;
const BookingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>;
const SupportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Z"/><path d="M5 18v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1"/><path d="M18 6a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2Z"/></svg>;
const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;

const services = [
    { icon: <CarIcon />, title: "Vast Vehicle Selection", description: "From luxury sedans to rugged SUVs, find the perfect ride for any occasion." },
    { icon: <BookingIcon />, title: "Easy & Secure Booking", description: "Book your car in minutes with our streamlined and secure reservation process." },
    { icon: <SupportIcon />, title: "24/7 Customer Support", description: "Our dedicated team is always here to help you, any time of the day." },
];

const Login = ({ onAuthSuccess, isDarkMode, setIsDarkMode }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '', email: '', contactNumber: '', address: '',
        password: '', confirmPassword: '', userRole: 'USER'
    });
    const [errors, setErrors] = useState({}); // State for validation errors
    const [activeServiceIndex, setActiveServiceIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    // --- NEW VALIDATION LOGIC ---
    const validateForm = () => {
        const newErrors = {};
        // Email validation
        if (!formData.email) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is not valid.";
        
        // Password validation
        if (!formData.password) newErrors.password = "Password is required.";
        
        // Registration-specific validation
        if (!isLoginView) {
            if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
            if (!/^[6-9]\d{9}$/.test(formData.contactNumber)) newErrors.contactNumber = "Must be a 10-digit number starting with 6, 7, 8, or 9.";
            if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters long.";
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return; // Stop submission if validation fails
        }
        
        setIsLoading(true);
        setErrors({}); // Clear old errors

        try {
            if (isLoginView) {
                const credentials = { email: formData.email, password: formData.password };
                const response = await loginUser(credentials);
                onAuthSuccess(response.role, response.token);
            } else {
                const registrationData = {
                    fullName: formData.fullName, email: formData.email,
                    contactNumber: formData.contactNumber, address: formData.address,
                    password: formData.password, userRole: formData.userRole,
                };
                await registerUser(registrationData);
                alert('Registration successful! Please login to continue.');
                setIsLoginView(true);
            }
        } catch (err) {
            setErrors({ api: err.message }); // Display API errors
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`login-container ${isDarkMode ? 'dark' : ''}`}>
            <div className="login-promo-panel">
                <div className="promo-content">
                    <h1>Your Next Ride, Awaits.</h1>
                    <ul className="services-list">
                        {services.map((service, index) => (
                            <li key={index} className={`service-item ${index === activeServiceIndex ? 'active' : ''}`}>
                                <div className="service-item-icon">{service.icon}</div>
                                <div className="service-item-text">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="login-form-panel">
                <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Theme">
                    {isDarkMode ? <SunIcon /> : <MoonIcon />}
                </button>
                <div className="form-container">
                    <h2>Get Started</h2>
                    <p className="subtitle">{isLoginView ? 'Sign in to continue' : 'Create a new account'}</p>
                    <div className="toggle-switch">
                        <button className={isLoginView ? 'active' : ''} onClick={() => { setIsLoginView(true); setErrors({}); }}>Login</button>
                        <button className={!isLoginView ? 'active' : ''} onClick={() => { setIsLoginView(false); setErrors({}); }}>Sign Up</button>
                    </div>
                    <form onSubmit={handleSubmit} className="auth-form" noValidate>
                        {!isLoginView && (
                            <>
                                <div className="input-group">
                                    <input type="text" name="fullName" placeholder="Full Name" onChange={handleInputChange} required />
                                    {errors.fullName && <span className="input-error">{errors.fullName}</span>}
                                </div>
                                <div className="input-group">
                                    <input type="tel" name="contactNumber" placeholder="Contact Number" onChange={handleInputChange} required />
                                    {errors.contactNumber && <span className="input-error">{errors.contactNumber}</span>}
                                </div>
                                <div className="input-group">
                                    <textarea name="address" placeholder="Address" rows="3" onChange={handleInputChange} required></textarea>
                                </div>
                            </>
                        )}
                        <div className="input-group">
                            <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} required />
                            {errors.email && <span className="input-error">{errors.email}</span>}
                        </div>
                        <div className="input-group">
                            <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
                            {errors.password && <span className="input-error">{errors.password}</span>}
                        </div>
                        {!isLoginView && (
                             <div className="input-group">
                                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleInputChange} required />
                                {errors.confirmPassword && <span className="input-error">{errors.confirmPassword}</span>}
                             </div>
                        )}
                        {errors.api && <p className="error-message api-error">{errors.api}</p>}
                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? 'Processing...' : (isLoginView ? 'Login' : 'Create Account')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;