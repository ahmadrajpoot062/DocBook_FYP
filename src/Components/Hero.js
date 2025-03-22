import React from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, User } from "lucide-react";
import { motion } from "framer-motion";
import { colors } from "../Constants/Colors"; // Import colors

const Hero = () => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative py-20 px-6 sm:px-8 lg:px-12 shadow-inner"
        >
            {/* Inner Shadows */}
            <div className="absolute inset-x-0 top-0 h-10  pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                    Welcome to{" "}
                    <span
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundColor: colors.primary
                        }}
                    >
                       DocBook
                    </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto" style={{ color: colors.black }}>
                    A seamless platform connecting doctors and patients for effortless appointment scheduling,
                    medical records management, and better healthcare services.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
                    {/* For Doctors Section */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between"
                        style={styles.divBox}
                    >
                        <div className="flex flex-col items-center">
                            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                <Stethoscope className="w-12 sm:w-14 h-12 sm:h-14" style={{ color: colors.primary }} />
                            </motion.div>
                            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: colors.black }}>For Doctors</h2>
                            <p className="text-sm sm:text-lg text-center mt-2" style={{ color: colors.black }}>
                                Manage appointments, track patient history, and provide better care with our digital tools.
                            </p>
                        </div>
                        <motion.button
                            onClick={() => navigate("/signup")}
                            className="w-full font-semibold px-5 sm:px-6 py-2 sm:py-3 rounded-lg hover:shadow-md transition-all duration-300 mt-4"
                            style={{ backgroundColor: colors.white, color: colors.primary }}
                            whileHover={{ scale: 1.05 }}
                        >
                            Get Started as Doctor
                        </motion.button>
                    </motion.div>

                    {/* For Patients Section */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="w-full max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between"
                        style={styles.divBox}
                    >
                        <div className="flex flex-col items-center">
                            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                <User className="w-12 sm:w-14 h-12 sm:h-14" style={{ color: colors.primary }} />
                            </motion.div>
                            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: colors.black }}>For Patients</h2>
                            <p className="text-sm sm:text-lg text-center mt-2" style={{ color: colors.black }}>
                                Book appointments, access medical records, and connect with doctors effortlessly.
                            </p>
                        </div>
                        <motion.button
                            onClick={() => navigate("/signup")}
                            className="w-full font-semibold px-5 sm:px-6 py-2 sm:py-3 rounded-lg hover:shadow-md transition-all duration-300 mt-4"
                            style={{ backgroundColor: colors.white, color: colors.primary }}
                            whileHover={{ scale: 1.05 }}
                        >
                            Get Started as Patient
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Hero;
const styles = {
    divBox: {
        backgroundColor: colors.secondary
    },
    
};
