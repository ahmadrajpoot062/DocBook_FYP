import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { colors } from '../Constants/Colors';
import ApiService from '../Services/ApiService';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';

const LoginPage = () => {
    const [focusedFields, setFocusedFields] = useState({
        email: false,
        password: false,
    });
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { token } = await ApiService.login(formData.email, formData.password);

            // Save the token to localStorage
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userEmail', formData.email);

            alert("Login successful!");

            // Fetch role request using email
            const { role } = await ApiService.getUserRole(formData.email);
            localStorage.setItem('userRole', role);
            alert(`Role: ${role}`);

            // Navigate based on the role
            if (role === 'Doctor') {
                window.location.href = 'doctorDashboard';
            } else if (role === 'Patient') {
                window.location.href = 'patientDashboard';
            } else if (role === 'admin') {
                window.location.href = '/admin';
            } else {
                alert('Unknown role. Please contact support.');
            }
        } catch (error) {
            console.error('Error during login', error);
            alert(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className='LoginPage'>
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
                {/* Main Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl"
                >
                    {/* Form Section */}
                    <motion.div
                        initial={isMobile ? { opacity: 1 } : { x: -50, opacity: 0 }}
                        animate={isMobile ? { opacity: 1 } : { x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:w-1/2 p-8 md:p-10 bg-white"
                    >
                        <div className="flex justify-center mb-6">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="w-16 h-16 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: colors.primary }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </motion.div>
                        </div>
                        
                        <h2 className="text-3xl font-bold mb-2 text-center flex items-center justify-center gap-2" style={{ color: colors.primary }}>
                            <FaSignInAlt /> Welcome Back
                        </h2>
                        <p className="text-gray-500 text-center mb-8">Please enter your details</p>

                        <form onSubmit={handleSubmit}>
                            {/* Email Field */}
                            <div className="relative mb-6">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200"
                                    style={{ 
                                        borderColor: focusedFields.email ? colors.primary : '#d1d5db',
                                        focusRingColor: colors.primary 
                                    }}
                                    onFocus={() => handleFocus('email')}
                                    onBlur={() => handleBlur('email')}
                                />
                                <label
                                    htmlFor="email"
                                    className={`absolute left-10 transition-all duration-200 pointer-events-none ${
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
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 pr-10"
                                        style={{ 
                                            borderColor: focusedFields.password ? colors.primary : '#d1d5db',
                                            focusRingColor: colors.primary 
                                        }}
                                        onFocus={() => handleFocus('password')}
                                        onBlur={() => handleBlur('password')}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                                <label
                                    htmlFor="password"
                                    className={`absolute left-10 transition-all duration-200 pointer-events-none ${
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

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        className="h-4 w-4 rounded border-gray-300 focus:ring-2"
                                        style={{ 
                                            focusRingColor: colors.primary,
                                            accentColor: colors.primary
                                        }}
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </label>
                                </div>
                                <button
                                    type="button"
                                    className="text-sm hover:underline"
                                    style={{ color: colors.primary }}
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Log In Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                                style={{ 
                                    backgroundColor: colors.primary, 
                                    color: colors.white,
                                    focusRingColor: colors.primary
                                }}
                            >
                                <FaSignInAlt /> Log In
                            </motion.button>

                            {/* Social Login */}
                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">
                                            Or continue with
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-3 gap-3">
                                    <motion.button
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                                        </svg>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10C20 4.477 15.523 0 10 0zm4.293 15.707a1 1 0 01-1.414 1.414L10 11.414l-2.879 2.879a1 1 0 01-1.414-1.414L8.586 10 5.707 7.121a1 1 0 011.414-1.414L10 8.586l2.879-2.879a1 1 0 011.414 1.414L11.414 10l2.879 2.879z" clipRule="evenodd" />
                                        </svg>
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </motion.button>
                                </div>
                            </div>
                        </form>
                    </motion.div>

                    {/* Welcome Back Section */}
                    <motion.div
                        initial={isMobile ? { opacity: 0 } : { x: 50, opacity: 0 }}
                        animate={isMobile ? { opacity: 1 } : { x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center items-center text-center relative"
                        style={{ backgroundColor: colors.primary }}
                    >
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white"></div>
                            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white"></div>
                            <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white"></div>
                        </div>
                        
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6 }}
                            className="relative z-10"
                        >
                            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: colors.white }}>
                                New Here?
                            </h1>
                            <p className="mb-6 text-lg md:text-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
                                Sign up and discover a great community!
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05, rotate: 1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/signup")}
                                className="py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-200 shadow-md"
                                style={{ 
                                    backgroundColor: colors.white, 
                                    color: colors.primary,
                                    focusRingColor: colors.white
                                }}
                            >
                                Sign Up
                            </motion.button>
                        </motion.div>
                        
                        {/* Animated Circles */}
                        <motion.div 
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, 0]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute bottom-4 left-4 w-8 h-8 rounded-full border-2 border-white opacity-30"
                        ></motion.div>
                        <motion.div 
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, -5, 0]
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 2
                            }}
                            className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-white opacity-20"
                        ></motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;