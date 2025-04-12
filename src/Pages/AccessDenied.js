import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaArrowLeft } from "react-icons/fa";

const AccessDenied = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white p-6">
            <motion.div
                className="text-center max-w-lg p-6 bg-white shadow-lg rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <FaLock className="text-3xl text-red-500" />
                </motion.div>
                <motion.h1
                    className="text-3xl font-bold text-red-600 mb-4"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Access Denied
                </motion.h1>
                <motion.p
                    className="text-gray-600 mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    You do not have permission to access this page. Please contact the administrator if you believe this is an error.
                </motion.p>

                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <motion.button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaArrowLeft />
                        Go Back
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AccessDenied;
