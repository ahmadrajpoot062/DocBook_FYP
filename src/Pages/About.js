import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { colors } from "../Constants/Colors"; // Import the colors

function About() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-screen bg-white text-gray-800 p-8"
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-6xl mx-auto px-4"
            >
                {/* About Us Section */}
                <div className="pt-16 pb-12 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            style={{ color: colors.primary }}
                        >
                            About
                        </motion.span>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto"
                        style={{ color: colors.black }}
                    >
                        Welcome to our Medicare service. We provide comprehensive healthcare solutions for doctors and patients.
                    </motion.p>
                </div>

                {/* Our Mission and Our Vision Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Our Mission Section */}
                    <motion.div
                        initial={{ x: -150, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 10 }}
                        className="p-8 rounded-lg shadow-sm border border-gray-200"
                        style={{ backgroundColor: colors.secondary }}
                    >
                        <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
                            Our Mission
                        </h2>
                        <p className="text-base" style={{ color: colors.black }}>
                            Our mission is to ensure that Medicare services are accessible to everyone with transparency and quality care.
                        </p>
                    </motion.div>

                    {/* Our Vision Section */}
                    <motion.div
                        initial={{ x: 150, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 10 }}
                        className="p-8 rounded-lg shadow-sm border border-gray-200"
                        style={{ backgroundColor: colors.secondary }}
                    >
                        <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
                            Our Vision
                        </h2>
                        <p className="text-base" style={{ color: colors.black }}>
                            We aim to be the leading provider of affordable and reliable Medicare services, promoting healthier lives.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default About;