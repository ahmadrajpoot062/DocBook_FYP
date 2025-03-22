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
        <div className="min-h-screen bg-white text-gray-800 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Heading */}
                <motion.h1 
                    initial={{ opacity: 0, y: -30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6 }}
                    className="text-4xl sm:text-5xl font-extrabold text-center mb-8"
                    style={{ color: colors.primary }}
                >
                    Help Center
                </motion.h1>

                {/* Description */}
                <motion.p 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg sm:text-xl text-center mb-12"
                    style={{ color: colors.black }}
                >
                    Find answers to your questions or contact us for further assistance.
                </motion.p>

                {/* How to Use the App Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)" }}
                    className="rounded-2xl p-8 shadow-xl transition-all duration-300 mb-8"
                    style={{ backgroundColor: colors.secondary }}
                >
                    <h2
                        className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center hover:text-opacity-80 transition-colors duration-300"
                        style={{ color: colors.primary }}
                        onClick={() => setHowToUseOpen(!howToUseOpen)}
                    >
                        How to Use the App
                        <span className="text-sm">{howToUseOpen ? '▲' : '▼'}</span>
                    </h2>
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: howToUseOpen ? "auto" : 0, opacity: howToUseOpen ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                    >
                        <ol className="list-decimal list-inside space-y-4 pl-4" style={{ color: colors.black }}>
                            <li>Sign up and create an account.</li>
                            <li>Log in to access your dashboard.</li>
                            <li>Explore features and navigate through different sections.</li>
                            <li>For doctor and patient, different features are available.</li>
                        </ol>
                    </motion.div>
                </motion.div>

                {/* FAQs Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)" }}
                    className="rounded-2xl p-8 shadow-xl transition-all duration-300"
                    style={{ backgroundColor: colors.secondary }}
                >
                    <h2
                        className="text-2xl font-bold mb-6 cursor-pointer flex justify-between items-center hover:text-opacity-80 transition-colors duration-300"
                        style={{ color: colors.primary }}
                        onClick={() => setFaqsOpen(!faqsOpen)}
                    >
                        FAQs
                        <span className="text-sm">{faqsOpen ? '▲' : '▼'}</span>
                    </h2>
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: faqsOpen ? "auto" : 0, opacity: faqsOpen ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-4 pl-4" style={{ color: colors.black }}>
                            <p><strong>Q: How do I reset my password?</strong></p>
                            <p className="font-light">A: You can reset your password by clicking on the "Forgot Password" link on the login page.</p>
                            <p><strong>Q: How do I contact support?</strong></p>
                            <p className="font-light">A: You can contact support through the "Contact Us" section in the app.</p>
                            <p><strong>Q: Is my data secure?</strong></p>
                            <p className="font-light">A: Yes, we use encryption and security measures to protect user data.</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default Help;
