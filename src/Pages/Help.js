import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { colors } from '../Constants/Colors';

function Help() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [howToUseOpen, setHowToUseOpen] = useState(false);
    const [faqsOpen, setFaqsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-block mb-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                            style={{ backgroundColor: colors.primary }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </motion.div>
                    </div>
                    <motion.h1 
                        className="text-4xl sm:text-5xl font-bold mb-4"
                        style={{ color: colors.primary }}
                    >
                        Help Center
                    </motion.h1>
                    <motion.p 
                        className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Find answers to your questions or contact us for further assistance.
                    </motion.p>
                </motion.div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* How to Use the App Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div 
                            className={`rounded-xl overflow-hidden border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl ${howToUseOpen ? 'ring-2 ring-blue-500' : ''}`}
                        >
                            <div
                                className="p-6 cursor-pointer flex justify-between items-center group"
                                style={{ backgroundColor: colors.primary }}
                                onClick={() => setHowToUseOpen(!howToUseOpen)}
                            >
                                <div className="flex items-center">
                                    <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-white">How to Use the App</h2>
                                </div>
                                <motion.div
                                    animate={{ rotate: howToUseOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-white group-hover:scale-110 transition-transform"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </motion.div>
                            </div>
                            
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                    height: howToUseOpen ? "auto" : 0, 
                                    opacity: howToUseOpen ? 1 : 0 
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="p-6">
                                    <ol className="list-decimal list-inside space-y-3 text-gray-700">
                                        <li className="pb-3 pl-2 -indent-4">
                                            <span className="font-medium">Sign up and create an account</span> to get started with our platform.
                                        </li>
                                        <li className="pb-3 pl-2 -indent-4">
                                            <span className="font-medium">Log in to access your dashboard</span> where you can manage your profile and services.
                                        </li>
                                        <li className="pb-3 pl-2 -indent-4">
                                            <span className="font-medium">Explore features</span> and navigate through different sections using the main menu.
                                        </li>
                                        <li className="pl-2 -indent-4">
                                            <span className="font-medium">Different interfaces</span> are available for doctors and patients with role-specific features.
                                        </li>
                                    </ol>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* FAQs Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div 
                            className={`rounded-xl overflow-hidden border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl ${faqsOpen ? 'ring-2 ring-blue-500' : ''}`}
                        >
                            <div
                                className="p-6 cursor-pointer flex justify-between items-center group"
                                style={{ backgroundColor: colors.primary }}
                                onClick={() => setFaqsOpen(!faqsOpen)}
                            >
                                <div className="flex items-center">
                                    <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-white">Frequently Asked Questions</h2>
                                </div>
                                <motion.div
                                    animate={{ rotate: faqsOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-white group-hover:scale-110 transition-transform"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </motion.div>
                            </div>
                            
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                    height: faqsOpen ? "auto" : 0, 
                                    opacity: faqsOpen ? 1 : 0 
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="p-6 space-y-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="font-semibold text-lg text-gray-800">Q: How do I reset my password?</p>
                                        <p className="mt-2 text-gray-600">A: You can reset your password by clicking on the "Forgot Password" link on the login page. You'll receive an email with instructions to create a new password.</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="font-semibold text-lg text-gray-800">Q: How do I contact support?</p>
                                        <p className="mt-2 text-gray-600">A: You can contact our support team through the "Contact Us" section in the app, or by emailing support@example.com. We typically respond within 24 hours.</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="font-semibold text-lg text-gray-800">Q: Is my data secure?</p>
                                        <p className="mt-2 text-gray-600">A: Absolutely. We use industry-standard encryption and security measures to protect all user data. Your information is always kept confidential and secure.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Help;