import React from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, User } from "lucide-react";
import { motion } from "framer-motion";
import { colors } from "../Constants/Colors";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative py-16 sm:py-20 md:py-24 lg:py-28 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-blue-50 to-white"
            style={{ backgroundColor: colors.background }}
        >
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-blue-100 opacity-20 mix-blend-multiply filter blur-xl"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-blue-200 opacity-20 mix-blend-multiply filter blur-xl"></div>
            </div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 sm:mb-10 md:mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
                        Welcome to{" "}
                        <span 
                            className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700"
                            style={{
                                backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`
                            }}
                        >
                            DocBook
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-600"
                        style={{ color: colors.text }}
                    >
                        Revolutionizing healthcare with seamless doctor-patient connections, appointment management, and medical records access.
                    </motion.p>
                </motion.div>

                <motion.div 
                    className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {/* For Doctors Card */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 sm:p-10 rounded-2xl shadow-lg flex flex-col justify-between"
                        style={{ 
                            backgroundColor: colors.white,
                            border: `1px solid ${colors.border}`,
                            boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`
                        }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex flex-col items-center">
                            <motion.div 
                                className="mb-6 p-4 rounded-full bg-blue-50"
                                animate={{ 
                                    scale: [1, 1.05, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ 
                                    repeat: Infinity, 
                                    duration: 4,
                                    ease: "easeInOut"
                                }}
                            >
                                <Stethoscope className="w-12 h-12 sm:w-14 sm:h-14" style={{ color: colors.primary }} />
                            </motion.div>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: colors.primary }}>
                                For Doctors
                            </h2>
                            <p className="text-base sm:text-lg text-center text-gray-600 mb-6" style={{ color: colors.text }}>
                                Streamline your practice with digital tools for appointments, patient records, and telemedicine.
                            </p>
                        </div>
                        <motion.button
                            onClick={() => navigate("/signup", { state: { role: "doctor" } })}
                            className="w-full font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                            style={{ 
                                backgroundColor: colors.primary,
                                color: colors.white
                            }}
                            whileHover={{ 
                                scale: 1.03,
                                boxShadow: `0 10px 15px -3px rgba(59, 130, 246, 0.3)`
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Get Started as Doctor
                        </motion.button>
                    </motion.div>

                    {/* For Patients Card */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 sm:p-10 rounded-2xl shadow-lg flex flex-col justify-between"
                        style={{ 
                            backgroundColor: colors.white,
                            border: `1px solid ${colors.border}`,
                            boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`
                        }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex flex-col items-center">
                            <motion.div 
                                className="mb-6 p-4 rounded-full bg-blue-50"
                                animate={{ 
                                    scale: [1, 1.05, 1],
                                    rotate: [0, -5, 5, 0]
                                }}
                                transition={{ 
                                    repeat: Infinity, 
                                    duration: 4,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                            >
                                <User className="w-12 h-12 sm:w-14 sm:h-14" style={{ color: colors.primary }} />
                            </motion.div>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: colors.primary }}>
                                For Patients
                            </h2>
                            <p className="text-base sm:text-lg text-center text-gray-600 mb-6" style={{ color: colors.text }}>
                                Access quality healthcare with easy appointment booking and secure medical records.
                            </p>
                        </div>
                        <motion.button
                            onClick={() => navigate("/signup", { state: { role: "patient" } })}
                            className="w-full font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                            style={{ 
                                backgroundColor: colors.primary,
                                color: colors.white
                            }}
                            whileHover={{ 
                                scale: 1.03,
                                boxShadow: `0 10px 15px -3px rgba(59, 130, 246, 0.3)`
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Get Started as Patient
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Hero;