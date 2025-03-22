import React, { useState } from "react";
import { colors } from "../Constants/Colors";
import { motion } from "framer-motion";

const Contact = () => {
  const [focusedField, setFocusedField] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Reset form submission state after showing success animation
    setTimeout(() => {
      setFormSubmitted(false);
    }, 3000);
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center px-4 py-8 sm:px-6"
      style={{ backgroundColor: colors.background || "#f8f9fa" }}
    >
      {/* Header content with animation */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold mt-12 mb-2"
          style={{ color: colors.primary || "#3b82f6" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Get In Touch
        </motion.h2>
        <motion.div
          className="w-16 sm:w-20 h-1 mx-auto mb-4"
          style={{ backgroundColor: colors.primary || "#3b82f6" }}
          initial={{ width: 0 }}
          animate={{ width: "5rem" }}
          transition={{ delay: 0.6, duration: 0.5 }}
        ></motion.div>
        <motion.p
          className="text-sm sm:text-base max-w-md"
          style={{ color: colors.textDark || "#4b5563" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          We're ready to answer your questions and help with your needs.
        </motion.p>
      </motion.div>

      {/* Form container with animation */}
      <motion.div
        className="w-full max-w-lg p-6 sm:p-8 rounded-lg shadow-lg relative overflow-hidden mt-12 mb-12"
        style={{ backgroundColor: colors.secondary || "#ffffff" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        {formSubmitted && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <motion.p
              className="text-lg font-medium text-gray-800"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Message Sent Successfully!
            </motion.p>
            <motion.p
              className="text-sm text-gray-500 mt-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              We'll get back to you soon.
            </motion.p>
          </motion.div>
        )}

        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-gray-700 mb-1 text-sm sm:text-base font-medium">
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-300"
              style={{
                borderColor:
                  focusedField === "name" ? colors.primary : "rgb(209, 213, 219)",
              }}
              placeholder="Enter your full name"
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-gray-700 mb-1 text-sm sm:text-base font-medium">
              Email Address
            </label>
            <input
              type="email"
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-300"
              style={{
                borderColor:
                  focusedField === "email" ? colors.primary : "rgb(209, 213, 219)",
              }}
              placeholder="Enter your email"
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-gray-700 mb-1 text-sm sm:text-base font-medium">
              Your Message
            </label>
            <textarea
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-300"
              style={{
                borderColor:
                  focusedField === "message" ? colors.primary : "rgb(209, 213, 219)",
              }}
              placeholder="How can we help you?"
              rows="4"
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              required
            ></textarea>
          </motion.div>

          <motion.button
            className="w-full p-2.5 sm:p-3 rounded-lg text-white text-sm sm:text-base font-medium transition-all duration-300"
            style={{
              backgroundColor: colors.primary || "#3b82f6",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            type="submit"
          >
            Send Message
          </motion.button>
        </form>

        <motion.div
          className="mt-6 text-center text-xs sm:text-sm text-gray-500 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 3, duration: 1 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </motion.svg>
          <p>We typically respond within 24 hours</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;