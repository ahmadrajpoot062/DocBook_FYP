import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { colors } from '../Constants/Colors';
import ApiService from '../Services/ApiService';
import { FaUser, FaEnvelope, FaVenusMars, FaUserMd, FaUserAlt, FaCheckCircle, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const SignUpPage = () => {
    const location = useLocation();
    const preSelectedRole = location.state?.role || '';

    const [focusedFields, setFocusedFields] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false,
        role: false,
        gender: false,
    });

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: preSelectedRole, // Pre-select the role based on the passed state
        gender: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
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

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const userData = {
                userName: formData.username,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                gender: formData.gender
            };

            await ApiService.register(userData);

            alert('Signup successful');
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Detailed error:', error.response.data);
                alert('Signup failed: ' + (error.response.data.message || JSON.stringify(error.response.data)));
            } else {
                console.error(error);
                alert('Signup failed, unknown error occurred.');
            }
        }
    };

    return (
        <div className='SignUpPage'>
            <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
                {/* Main Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row w-full max-w-6xl rounded-xl overflow-hidden shadow-lg my-8"
                >
                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:w-2/5 p-8 md:p-10 flex flex-col justify-center items-center text-center"
                        style={{ backgroundColor: colors.primary }}
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mb-6"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: colors.white }}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-3xl font-bold mb-4"
                            style={{ color: colors.white }}
                        >
                            Join Us Today!
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mb-6 text-lg"
                            style={{ color: 'rgba(255,255,255,0.8)' }}
                        >
                            Become part of our growing community
                        </motion.p>

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

                    {/* Sign Up Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="md:w-3/5 p-8 md:p-10 bg-white"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-8 text-center"
                        >
                            <h2 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2" style={{ color: colors.primary }}>
                                <FaUserAlt /> Create Account
                            </h2>

                            <div className="inline-flex items-center space-x-4 mb-3">
                                <span className="text-gray-600">Signing up as:</span>
                                <span className="px-4 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
                                    {formData.role || 'Select Role'}
                                </span>
                            </div>
                        </motion.div>

                        <form onSubmit={handleSubmit}>
                            {/* Username Field */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="relative mb-5"
                            >
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 transition-all"
                                    onFocus={() => handleFocus('username')}
                                    onBlur={() => handleBlur('username')}
                                    required
                                />
                                <label
                                    htmlFor="username"
                                    className={`absolute left-10 transition-all duration-200 pointer-events-none ${focusedFields.username || formData.username
                                        ? 'top-0 text-xs bg-white px-1 -mt-3'
                                        : 'top-3.5 text-gray-400'
                                        }`}
                                    style={{
                                        color: focusedFields.username || formData.username ? colors.primary : 'inherit'
                                    }}
                                >
                                    Username
                                </label>
                            </motion.div>

                            {/* Email Field */}
                            <div className="relative mb-5">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 transition-all"
                                    onFocus={() => handleFocus('email')}
                                    onBlur={() => handleBlur('email')}
                                />
                                <label
                                    htmlFor="email"
                                    className={`absolute left-10 transition-all duration-200 pointer-events-none ${focusedFields.email || formData.email
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
                            <div className="relative mb-5">
                                <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 transition-all pr-10"
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
                                    className={`absolute left-10 transition-all duration-200 pointer-events-none ${focusedFields.password || formData.password
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
                            <div className="relative mb-5">
                                <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 transition-all pr-10"
                                        onFocus={() => handleFocus('confirmPassword')}
                                        onBlur={() => handleBlur('confirmPassword')}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>
                                <label
                                    htmlFor="confirmPassword"
                                    className={`absolute left-10 transition-all duration-200 pointer-events-none ${focusedFields.confirmPassword || formData.confirmPassword
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



                            {/* Gender Field */}
                            <div className="relative mb-6">
                                <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    id="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:border-blue-500 transition-all"
                                    onFocus={() => handleFocus('gender')}
                                    onBlur={() => handleBlur('gender')}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <label
                                    htmlFor="gender"
                                    className={`absolute left-10 transition-all duration-200 pointer-events-none ${focusedFields.gender || formData.gender
                                        ? 'top-0 text-xs bg-white px-1 -mt-3'
                                        : 'top-3.5 text-gray-400'
                                        }`}
                                    style={{
                                        color: focusedFields.gender || formData.gender ? colors.primary : 'inherit'
                                    }}
                                >
                                </label>
                            </div>

                            {/* Role Selection - Label + Options Inline & Centered */}
                            <div className="mb-6 flex flex-col items-center">
                                <div className="flex items-center gap-6 flex-wrap justify-center">
                                    <span className="text-gray-700 font-medium">Role:</span>
                                    {['doctor', 'patient'].map((roleOption) => (
                                        <label
                                            key={roleOption}
                                            className=
                                            {`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition-all
                    ${formData.role === roleOption ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                `}
                                        >
                                            {roleOption === 'doctor' ? <FaUserMd className="text-blue-500" /> : <FaUserAlt className="text-blue-500" />}
                                            <input
                                                type="radio"
                                                name="role"
                                                value={roleOption}
                                                checked={formData.role === roleOption}
                                                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                                                onFocus={() => handleFocus('role')}
                                                onBlur={() => handleBlur('role')}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="capitalize text-sm text-gray-700">{roleOption}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>


                            {/* Terms and Conditions */}
                            <div className="flex items-center mb-6">
                                <FaCheckCircle className="text-blue-500 mr-2" />
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="h-4 w-4 rounded border-gray-300 focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                    I agree to the <a
                                        href="/terms"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Terms
                                    </a>

                                </label>
                            </div>

                            {/* Sign Up Button */}
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                className="w-full py-3 px-4 rounded-lg focus:outline-none shadow-md flex items-center justify-center gap-2"
                                style={{
                                    backgroundColor: colors.primary,
                                    color: colors.white
                                }}
                            >
                                <FaUserAlt /> Create Account
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