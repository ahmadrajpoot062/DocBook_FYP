import React, { useEffect, useState } from 'react';
import { FaThumbsUp, FaCheck, FaClock } from "react-icons/fa";
import { colors } from '../../Constants/Colors'; // Import colors
import { motion, AnimatePresence } from "framer-motion"; // For animations
import { useNavigate } from 'react-router-dom'; // Add this import

const RequestSubmitted = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setDoctor({ firstName: "John", lastName: "Doe", id: 1 });
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
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.7,
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.3
      }
    }
  };

  const handleContinue = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 sm:px-6 lg:px-8" 
         style={{ backgroundColor: colors.background || '#ffffff' }}>
      <AnimatePresence>
        <motion.div 
          className="shadow-xl rounded-lg p-6 sm:p-8 max-w-md w-full text-center relative overflow-hidden"
          style={{ backgroundColor: colors.secondary || '#ffffff' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Success icon with animation */}
          <motion.div 
            className="relative mb-6 mx-auto"
            variants={iconVariants}
          >
            <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                 style={{ backgroundColor: `${colors.primary}15` }}>
              <FaThumbsUp className="w-10 h-10" style={{ color: colors.primary }} />
            </div>
            <motion.div 
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.success || '#10b981' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
            >
              <FaCheck className="text-white text-sm" />
            </motion.div>
          </motion.div>

          {/* Success header */}
          <motion.h1 
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: colors.textDark || '#111827' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Request Submitted!
          </motion.h1>

          {/* Content with loading state */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {loading ? (
              <div className="py-4 flex flex-col items-center">
                <div className="w-10 h-10 border-t-2 border-b-2 rounded-full animate-spin mb-2"
                     style={{ borderColor: colors.primary }}></div>
                <p style={{ color: colors.textLight || '#6b7280' }}>Loading doctor details...</p>
              </div>
            ) : (
              <>
                <p className="text-sm sm:text-base mb-2" style={{ color: colors.textLight || '#6b7280' }}>
                  Your request has been submitted successfully to
                </p>
                <p className="text-base sm:text-lg font-semibold mb-4" style={{ color: colors.textDark || '#111827' }}>
                  Dr. {doctor.firstName} {doctor.lastName}
                </p>
                <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start gap-3 text-left"
                     style={{ backgroundColor: `${colors.primary}10` }}>
                  <FaClock className="text-lg mt-0.5 flex-shrink-0" style={{ color: colors.primary }} />
                  <p className="text-sm" style={{ color: colors.textLight || '#6b7280' }}>
                    Please wait until the doctor accepts your request. You will receive an 
                    email when <span className="font-medium" style={{ color: colors.textDark }}>
                    Dr. {doctor.firstName} {doctor.lastName}</span> accepts your request. So be patient!
                  </p>
                </div>
              </>
            )}
            
            {/* Action button - Updated to use navigate */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.button 
                  onClick={handleContinue}
                  className="inline-block px-6 py-3 rounded-lg text-sm sm:text-base font-medium shadow-md"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: colors.buttonText || '#ffffff'
                  }}
                  whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Continue
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Background decor element */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-10"
               style={{ backgroundColor: colors.primary }}></div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RequestSubmitted;