import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion for animations
import { colors } from '../Constants/Colors'; // Import colors

const SignUpPage = () => {
    const [focusedFields, setFocusedFields] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0); // Ensure the page always starts at the top
    }, []);

    const handleFocus = (field) => {
        setFocusedFields((prev) => ({ ...prev, [field]: true }));
    };

    const handleBlur = (field, value) => {
        if (!value) {
            setFocusedFields((prev) => ({ ...prev, [field]: false }));
        }
    };

    return (
        <div className='SignUpPage'>
            <div className="min-h-screen flex items-center justify-center p-4 bg-white">
                {/* Main Container with Shadow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", type: "spring", bounce: 0.4 }}
                    className="flex flex-col md:flex-row w-full max-w-4xl border rounded-lg overflow-hidden shadow-lg"
                >
                    {/* Welcome Section (Left) */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
                        className="md:w-1/2 p-8 flex flex-col justify-center items-center text-center"
                        style={{ backgroundColor: colors.primary }}
                    >
                        <h1 className="text-2xl font-bold mb-4" style={{ color: colors.white }}>
                            Welcome!
                        </h1>
                        <p className="mb-6" style={{ color: colors.white }}>
                            Already registered?
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/login")}
                            className="py-2 px-4 rounded-lg focus:outline-none focus:ring-2"
                            style={{ backgroundColor: colors.white, color: colors.primary }}
                        >
                            Login
                        </motion.button>
                    </motion.div>

                    {/* Sign Up Form Section (Right) */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
                        className="md:w-1/2 p-8 bg-white border-l"
                    >
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2" style={{ color: colors.primary }}>
                                Sign Up
                            </h2>
                            <p className="text-gray-600">
                                Signing up as: <span className="font-bold">Doctor</span>
                            </p>
                        </div>

                        <form>
                            {/* Username Field */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="relative mb-6"
                            >
                                <input
                                    type="text"
                                    id="username"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                    onFocus={() => handleFocus('username')}
                                    onBlur={(e) => handleBlur('username', e.target.value)}
                                />
                                <label
                                    htmlFor="username"
                                    className={`absolute left-3 transition-all duration-200 ${focusedFields.username
                                        ? 'top-0 text-xs bg-white px-1 -mt-3'
                                        : 'top-2 text-gray-400'
                                        }`}
                                    style={{ color: focusedFields.username ? colors.primary : 'inherit' }}
                                >
                                    Username
                                </label>
                            </motion.div>

                            {/* Email Field */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="relative mb-6"
                            >
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                    onFocus={() => handleFocus('email')}
                                    onBlur={(e) => handleBlur('email', e.target.value)}
                                />
                                <label
                                    htmlFor="email"
                                    className={`absolute left-3 transition-all duration-200 ${focusedFields.email
                                        ? 'top-0 text-xs bg-white px-1 -mt-3'
                                        : 'top-2 text-gray-400'
                                        }`}
                                    style={{ color: focusedFields.email ? colors.primary : 'inherit' }}
                                >
                                    Email
                                </label>
                            </motion.div>

                            {/* Password Field */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                                className="relative mb-6"
                            >
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                    onFocus={() => handleFocus('password')}
                                    onBlur={(e) => handleBlur('password', e.target.value)}
                                />
                                <label
                                    htmlFor="password"
                                    className={`absolute left-3 transition-all duration-200 ${focusedFields.password
                                        ? 'top-0 text-xs bg-white px-1 -mt-3'
                                        : 'top-2 text-gray-400'
                                        }`}
                                    style={{ color: focusedFields.password ? colors.primary : 'inherit' }}
                                >
                                    Password
                                </label>
                            </motion.div>

                            {/* Confirm Password Field */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                className="relative mb-6"
                            >
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                    onFocus={() => handleFocus('confirmPassword')}
                                    onBlur={(e) => handleBlur('confirmPassword', e.target.value)}
                                />
                                <label
                                    htmlFor="confirmPassword"
                                    className={`absolute left-3 transition-all duration-200 ${focusedFields.confirmPassword
                                        ? 'top-0 text-xs bg-white px-1 -mt-3'
                                        : 'top-2 text-gray-400'
                                        }`}
                                    style={{ color: focusedFields.confirmPassword ? colors.primary : 'inherit' }}
                                >
                                    Confirm Password
                                </label>
                            </motion.div>

                            {/* Sign Up Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}                                
                                type="submit"
                                className="w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2"
                                style={{ backgroundColor: colors.primary, color: colors.white }}
                            >
                                Sign Up
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default SignUpPage;
