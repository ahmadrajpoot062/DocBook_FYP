import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../Constants/Colors";
import { FiAlertCircle } from "react-icons/fi"; // Import alert icon
import { FaRegSadTear } from "react-icons/fa"; // Import "Not Found" icon

function MyProfile() {
  const [profile, setProfile] = useState({
    name: "",
    specialization: "",
    hospital: "",
    contactNumber: "",
    bio: "",
  });
  const [isProfileCreated, setIsProfileCreated] = useState(false); // Simulate profile creation status
  const [showModal, setShowModal] = useState(!isProfileCreated); // Show modal if no profile is created
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false); // Show "Not Found" view

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setIsProfileCreated(true); // Simulate profile creation
  };

  const handleCreateProfile = () => {
    setShowModal(false); // Close the "Profile Not Created" modal
  };

  const handleCancelCreateProfile = () => {
    setShowModal(false); // Close the "Profile Not Created" modal
    setShowNotFound(true); // Show "Not Found" icon and button
  };

  const handleReopenCreateProfileModal = () => {
    setShowNotFound(false); // Hide "Not Found" view
    setShowModal(true); // Reopen the "Profile Not Created" modal
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{ backgroundColor: colors.background }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <motion.div
        className="text-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>
          My Profile
        </h1>
        <p className="text-gray-500 text-lg">
          {isProfileCreated
            ? "View and update your profile information."
            : "Create your profile to get started."}
        </p>
      </motion.div>

      {/* Conditional Rendering */}
      {showNotFound ? (
        // Show "Not Found" Icon and "Create Profile" Button
        <motion.div
          className="flex flex-col items-center justify-center text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaRegSadTear size={64} className="text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
            Profile Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            You choose not to create a profile. Please create one to access your information.
          </p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            onClick={handleReopenCreateProfileModal} // Reopen "Profile Not Created" modal
          >
            Create Profile
          </button>
        </motion.div>
      ) : isProfileCreated ? (
        // Show Profile Information
        <motion.div
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
            Profile Information
          </h2>
          <div className="space-y-4">
            <p>
              <strong>Name:</strong> {profile.name}
            </p>
            <p>
              <strong>Specialization:</strong> {profile.specialization}
            </p>
            <p>
              <strong>Hospital:</strong> {profile.hospital}
            </p>
            <p>
              <strong>Contact Number:</strong> {profile.contactNumber}
            </p>
            <p>
              <strong>Bio:</strong> {profile.bio}
            </p>
          </div>
          <motion.button
            className="mt-6 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all"
            onClick={() => setIsProfileCreated(false)} // Switch to edit mode
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Update Profile
          </motion.button>
        </motion.div>
      ) : (
        // Show Profile Form
        <motion.form
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
            Create Your Profile
          </h2>
          <div className="space-y-6">
            {/* Name and Specialization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={profile.specialization}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter specialization"
                />
              </div>
            </div>

            {/* Hospital and Contact Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Hospital</label>
                <input
                  type="text"
                  name="hospital"
                  value={profile.hospital}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter hospital name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={profile.contactNumber}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter contact number"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter a short bio"
                rows="4"
              />
            </div>

            {/* Save Button */}
            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Save Profile
            </motion.button>
          </div>
        </motion.form>
      )}

      {/* Profile Not Created Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-xl shadow-2xl text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="mb-4 flex items-center justify-center">
                <FiAlertCircle size={36} className="text-red-500" /> {/* Alert icon */}
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
                Profile Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                Your profile is not created yet. Please create your profile to proceed.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                  onClick={handleCreateProfile} // Create Profile button
                >
                  Create Profile
                </button>
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
                  onClick={handleCancelCreateProfile} // Cancel button
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-xl shadow-2xl text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="mb-6">
                <span className="text-green-500 text-5xl">✔</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">Success</h2>
              <p className="text-gray-600 mb-6">Profile created successfully!</p>
              <button
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all"
                onClick={handleSuccessModalClose}
              >
                OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MyProfile;