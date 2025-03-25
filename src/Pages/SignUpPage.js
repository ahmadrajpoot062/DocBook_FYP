import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { colors } from '../Constants/Colors';

const SignUpPage = () => {
    const [focusedFields, setFocusedFields] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
    });
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleFocus = (field) => {
        setFocusedFields((prev) => ({ ...prev, [field]: true }));
    };

    const handleBlur = (field) => {
        if (!formData[field]) {
            setFocusedFields((prev) => ({ ...prev, [field]: false }));
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        console.log('Signup submitted', formData);
    };

    return (
        <div className='SignUpPage'>
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
                {/* Main Container - Simplified animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col md:flex-row w-full max-w-5xl rounded-xl overflow-hidden shadow-lg my-8"
                >
                    {/* Welcome Section (Left) - Simplified animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="md:w-2/5 p-8 md:p-10 flex flex-col justify-center items-center text-center"
                        style={{ backgroundColor: colors.primary }}
                    >
                        <div className="mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.white }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        
                        <h1 className="text-3xl font-bold mb-4" style={{ color: colors.white }}>
                            Join Us Today!
                        </h1>
                        <p className="mb-6 text-lg" style={{ color: 'rgba(255,255,255,0.8)' }}>
                            Become part of our growing community
                        </p>
                        
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate("/login")}
                            className="py-3 px-6 rounded-lg focus:outline-none shadow-md"
                            style={{ 
                                backgroundColor: colors.white, 
                                color: colors.primary
                            }}
                        >
                            Login Instead
                        </motion.button>
                    </motion.div>

                    {/* Sign Up Form Section (Right) - Simplified animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="md:w-3/5 p-8 md:p-10 bg-white"
                    >
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
                                Create Account
                            </h2>
                            
                            {/* User Type Display (Single text) */}
                            <div className="flex items-center space-x-4 mb-4">
                                <span className="text-gray-600">Signing up as:</span>
                                <span className="px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                    Doctor
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Username Field */}
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 transition-all"
                                    onFocus={() => handleFocus('username')}
                                    onBlur={() => handleBlur('username')}
                                />
                                <label
                                    htmlFor="username"
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                                        focusedFields.username || formData.username
                                            ? 'top-0 text-xs bg-white px-1 -mt-3'
                                            : 'top-3.5 text-gray-400'
                                    }`}
                                    style={{ 
                                        color: focusedFields.username || formData.username ? colors.primary : 'inherit' 
                                    }}
                                >
                                    Username
                                </label>
                            </div>

                            {/* Email Field */}
                            <div className="relative mb-6">
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 transition-all"
                                    onFocus={() => handleFocus('email')}
                                    onBlur={() => handleBlur('email')}
                                />
                                <label
                                    htmlFor="email"
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                                        focusedFields.email || formData.email
                                            ? 'top-0 text-xs bg-white px-1 -mt-3'
                                            : 'top-3.5 text-gray-400'
                                    }`}
                                    style={{ 
                                        color: focusedFields.email || formData.email ? colors.primary : 'inherit' 
                                    }}
                                >
                                    Email
                                </label>
                            </div>

                            {/* Password Field */}
                            <div className="relative mb-6">
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 transition-all pr-10"
                                        onFocus={() => handleFocus('password')}
                                        onBlur={() => handleBlur('password')}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                <label
                                    htmlFor="password"
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                                        focusedFields.password || formData.password
                                            ? 'top-0 text-xs bg-white px-1 -mt-3'
                                            : 'top-3.5 text-gray-400'
                                    }`}
                                    style={{ 
                                        color: focusedFields.password || formData.password ? colors.primary : 'inherit' 
                                    }}
                                >
                                    Password
                                </label>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="relative mb-8">
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 transition-all pr-10"
                                        onFocus={() => handleFocus('confirmPassword')}
                                        onBlur={() => handleBlur('confirmPassword')}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                <label
                                    htmlFor="confirmPassword"
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                                        focusedFields.confirmPassword || formData.confirmPassword
                                            ? 'top-0 text-xs bg-white px-1 -mt-3'
                                            : 'top-3.5 text-gray-400'
                                    }`}
                                    style={{ 
                                        color: focusedFields.confirmPassword || formData.confirmPassword ? colors.primary : 'inherit' 
                                    }}
                                >
                                    Confirm Password
                                </label>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-center mb-6">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="h-4 w-4 rounded border-gray-300 focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms</a>
                                </label>
                            </div>

                            {/* Sign Up Button */}
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                className="w-full py-3 px-4 rounded-lg focus:outline-none shadow-md"
                                style={{ 
                                    backgroundColor: colors.primary, 
                                    color: colors.white
                                }}
                            >
                                Create Account
                            </motion.button>

                            {/* Social Login */}
                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">
                                            Or sign up with
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-3 gap-3">
                                    {['Google', 'Apple', 'Facebook'].map((provider) => (
                                        <button
                                            key={provider}
                                            type="button"
                                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
                                        >
                                            {provider}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default SignUpPage;