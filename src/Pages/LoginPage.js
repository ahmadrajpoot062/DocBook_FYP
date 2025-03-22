import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion for animations
import { colors } from '../Constants/Colors'; // Import colors

const LoginPage = () => {
    const [focusedFields, setFocusedFields] = useState({
        email: false,
        password: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
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
        <div className='LoginPage'>
            <div className="min-h-screen flex items-center justify-center p-4 bg-white">
                {/* Main Container with Shadow */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row w-full max-w-4xl border rounded-lg overflow-hidden shadow-lg"
                >
                    {/* Form Section */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:w-1/2 p-8 bg-white border-r"
                    >
                        <h2 className="text-2xl font-semibold mb-6" style={{ color: colors.primary }}>
                            Log In
                        </h2>

                        <form>
                            {/* Email Field */}
                            <div className="relative mb-6">
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                    style={{ focusRingColor: colors.primary }}
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
                            </div>

                            {/* Password Field */}
                            <div className="relative mb-6">
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                                    style={{ focusRingColor: colors.primary }}
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
                            </div>

                            {/* Log In Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2"
                                style={{ backgroundColor: colors.primary, color: colors.white }}
                            >
                                Log In
                            </motion.button>

                            {/* Forgot Password Link */}
                            <p
                                className="text-center mt-4 hover:underline cursor-pointer"
                                style={{ color: colors.primary }}
                            >
                                Forgot Password?
                            </p>
                        </form>
                    </motion.div>

                    {/* Welcome Back Section */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="md:w-1/2 p-8 flex flex-col justify-center items-center text-center"
                        style={{ backgroundColor: colors.primary }}
                    >
                        <h1 className="text-2xl font-bold mb-4" style={{ color: colors.white }}>
                            Welcome Back!
                        </h1>
                        <p className="mb-6" style={{ color: colors.white }}>
                            Not registered yet?
                        </p>
                        <motion.button
                               whileHover={{ scale: 1.1, rotate: 2 }}
                               whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/signup")}
                            className="py-2 px-4 rounded-lg focus:outline-none focus:ring-2"
                            style={{ backgroundColor: colors.white, color: colors.primary }}
                        >
                            Sign Up
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;