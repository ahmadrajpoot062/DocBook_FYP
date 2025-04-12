import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { colors } from "../Constants/Colors";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="rounded-lg shadow-xl max-w-md w-full relative overflow-hidden"
        style={{ backgroundColor: colors.white }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-4 relative" style={{ backgroundColor: colors.primary }}>
          <h2 className="text-xl font-bold text-center" style={{ color: colors.white }}>
            Confirm Logout
          </h2>
          <motion.button
            className="absolute right-4 top-4 text-lg"
            style={{ color: colors.white }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
          >
            <FaTimes />
          </motion.button>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: `${colors.orange}15` }}
            >
              <FaSignOutAlt className="text-2xl" style={{ color: colors.orange }} />
            </div>
            <p className="text-center mb-6" style={{ color: colors.black }}>
              Are you sure you want to logout?
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <motion.button
              className="px-5 py-2 rounded-lg text-sm font-medium flex items-center"
              style={{ backgroundColor: colors.orange, color: colors.white }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onConfirm}
            >
              <FaCheck className="mr-2" /> Yes, Logout
            </motion.button>
            <motion.button
              className="px-5 py-2 rounded-lg text-sm font-medium flex items-center"
              style={{ backgroundColor: colors.primary, color: colors.white }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              <FaTimes className="mr-2" /> Cancel
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LogoutModal;
