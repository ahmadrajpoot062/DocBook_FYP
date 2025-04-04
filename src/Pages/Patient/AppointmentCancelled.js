import React, { useEffect, useState } from 'react';
import { colors } from '../../Constants/Colors'; // Import colors
import { motion, AnimatePresence } from 'framer-motion'; // Import for animations
import { FaTimesCircle, FaArrowRight } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom';

const AppointmentCancelled = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setDoctor({ firstName: "John", lastName: "Doe" });
      setLoading(false);
    }, 1000);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.5
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 200
      }
    }
  };

  const handleViewAppointments = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: colors.background || "#ffffff" }}
    >
      <motion.div
        className="shadow-lg rounded-lg overflow-hidden max-w-md w-full relative"
        style={{ backgroundColor: colors.lightRedBackground || "#ffffff" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Card header with red color */}
        <div
          className="py-4 text-center"
          style={{ backgroundColor: colors.red, color: colors.buttonText || "#ffffff" }}
        >
          <motion.div
            className="w-16 h-16 mx-auto mb-2 bg-white rounded-full flex items-center justify-center"
            variants={iconVariants}
          >
            <FaTimesCircle className="text-3xl" style={{ color: colors.red }} />
          </motion.div>
          <motion.h1
            className="text-2xl sm:text-3xl font-bold px-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Appointment Cancelled
          </motion.h1>
        </div>

        {/* Card body */}
        <div className="p-6 sm:p-8">
          <AnimatePresence>
            {loading ? (
              <motion.div
                className="flex justify-center items-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: `${colors.red}40`, borderTopColor: 'transparent' }}></div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p
                  className="text-base sm:text-lg text-center mb-8"
                  style={{ color: colors.textLight || "#6b7280" }}
                >
                  Your appointment with{" "}
                  <span className="font-semibold" style={{ color: colors.textDark || "#1f2937" }}>
                    Dr. {doctor?.firstName} {doctor?.lastName}
                  </span>{" "}
                  has been cancelled successfully!
                </p>
                <div className="flex justify-center mt-6">
                  <motion.button
                    onClick={handleViewAppointments}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm sm:text-base font-medium"
                    style={{
                      backgroundColor: colors.red,
                      color: colors.buttonText || '#ffffff'
                    }}
                    whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>View Appointments</span>
                    <FaArrowRight className="ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-5"
          style={{ backgroundColor: colors.red }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default AppointmentCancelled;