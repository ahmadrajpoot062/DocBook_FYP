import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { colors } from "../Constants/Colors";

function About() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
        >
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, type: "spring" }}
                            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                            style={{ backgroundColor: colors.primary }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                />
                            </svg>
                        </motion.div>

                        <motion.h1
                            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent"
                            style={{ color: colors.primary }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            About Our Healthcare Platform
                        </motion.h1>

                        <motion.p
                            className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Connecting patients with trusted healthcare providers through innovative technology and compassionate care.
                        </motion.p>
                    </motion.div>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Mission Card */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="p-8 sm:p-10">
                            <div className="flex items-center mb-6">
                                <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: `${colors.primary}20` }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        style={{ color: colors.primary }}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: colors.primary }}>
                                    Our Mission
                                </h2>
                            </div>
                            <p className="text-gray-600 text-base sm:text-lg">
                                To democratize access to quality healthcare by creating an inclusive platform that connects patients with trusted medical professionals, ensuring transparency, affordability, and exceptional care for all.
                            </p>
                        </div>
                    </motion.div>

                    {/* Vision Card */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="p-8 sm:p-10">
                            <div className="flex items-center mb-6">
                                <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: `${colors.primary}20` }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-8 w-8"
                                        style={{ color: colors.primary }}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: colors.primary }}>
                                    Our Vision
                                </h2>
                            </div>
                            <p className="text-gray-600 text-base sm:text-lg">
                                To revolutionize healthcare delivery by becoming the most trusted global platform that bridges the gap between patients and providers through innovative technology, data-driven insights, and compassionate service.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Values Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: colors.primary }}>
                        Our Core Values
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        These principles guide everything we do at our healthcare platform
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            title: "Patient-Centered",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            ),
                            description: "We prioritize patient needs and experiences above all else"
                        },
                        {
                            title: "Integrity",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            ),
                            description: "We uphold the highest ethical standards in all our actions"
                        },
                        {
                            title: "Innovation",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            ),
                            description: "We continuously improve through creative solutions"
                        },
                        {
                            title: "Collaboration",
                            icon: (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            ),
                            description: "We believe in teamwork between patients and providers"
                        }
                    ].map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                        >
                            <div className="p-3 rounded-full inline-flex items-center justify-center mb-4" style={{ backgroundColor: `${colors.primary}20` }}>
                                <div style={{ color: colors.primary }}>
                                    {value.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>{value.title}</h3>
                            <p className="text-gray-600">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default About;