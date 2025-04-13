import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../../Constants/Colors";
import { FaUserMd, FaHospital, FaPhone, FaGraduationCap, FaClock, FaDollarSign, FaCalendarAlt, FaHome, FaPhoneAlt, FaCheckCircle, FaEdit, FaImage, FaInfoCircle, FaCamera, FaTimes } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";
import { FaRegSadTear } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";

function MyProfile() {
  const [profile, setProfile] = useState({
    name: "",
    specialization: "",
    hospital: "",
    contactNumber: "",
    bio: "",
    dateOfBirth: "",
    address: "",
    profilePicture: null,
    phoneNumber: "",
    qualification: "",
    experienceYears: "",
    consultationFee: "",
    availabilityStart: "",
    availabilityEnd: "",
  });
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [showModal, setShowModal] = useState(!isProfileCreated);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setProfile((prev) => ({ ...prev, profilePicture: files[0] }));
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const availability = `${profile.availabilityStart} - ${profile.availabilityEnd}`;
    const updatedData = { ...profile, availability };
    console.log("Updated Profile Data:", updatedData);
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setIsProfileCreated(true);
    setShowModal(false);
  };

  const handleCreateProfile = () => {
    setShowModal(false);
  };

  const handleCancelCreateProfile = () => {
    setShowModal(false);
    setShowNotFound(true);
  };

  const handleReopenCreateProfileModal = () => {
    setShowNotFound(false);
    setShowModal(true);
  };

  const handleEditProfile = () => {
    setIsProfileCreated(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePicture(URL.createObjectURL(file));
    }
  };

  const handleSaveImage = () => {
    setProfile((prev) => ({ ...prev, profilePicture: newProfilePicture }));
    setIsEditingImage(false);
  };

  const handleCancelImageEdit = () => {
    setNewProfilePicture(null);
    setIsEditingImage(false);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            My <span className="text-blue-600">Profile</span>
          </h1>
          <motion.div
            className="w-24 h-1.5 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          <motion.p
            className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            {isProfileCreated
              ? "Manage your professional profile information"
              : "Create your profile to get started"}
          </motion.p>
        </motion.div>

        {/* Profile Picture Section */}
        {isProfileCreated && (
          <motion.div
            className="flex justify-center items-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-blue-500 shadow-lg flex items-center justify-center bg-blue-100">
                  <FaUserMd className="text-blue-500 text-4xl" />
                </div>
              )}
              <button
                onClick={() => setIsEditingImage(true)}
                className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-all"
              >
                <FaCamera />
              </button>
            </div>
          </motion.div>
        )}

        {/* Image Upload Modal */}
        <AnimatePresence>
          {isEditingImage && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <FaImage className="text-blue-500" /> Upload Picture
                  </h2>
                  <button
                    onClick={handleCancelImageEdit}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Choose an image
                  </label>
                  <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-all">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Click to browse or drag & drop
                    </label>
                  </div>
                </div>
                {newProfilePicture && (
                  <div className="mb-6">
                    <img
                      src={newProfilePicture}
                      alt="Preview"
                      className="w-full h-30 object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
                <div className="flex justify-end gap-4">
                  <button
                    onClick={handleCancelImageEdit}
                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveImage}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    Save
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conditional Rendering */}
        {showNotFound ? (
          <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-8 text-center max-w-md mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <FaRegSadTear className="text-gray-400 text-5xl" />
            </div>
            <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>
              Profile Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't created a profile yet. Please create one to access all features.
            </p>
            <motion.button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleReopenCreateProfileModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Profile
            </motion.button>
          </motion.div>
        ) : isProfileCreated ? (
          <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <FaUserMd className="text-blue-500 mr-2" />
                Profile Information
              </h2>
              <motion.button
                className="text-blue-600 hover:text-blue-800 transition-colors"
                onClick={handleEditProfile}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEdit className="text-xl" />
              </motion.button>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaUserMd className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Name & Specialization
                    </h3>
                    <p className="text-gray-900 font-medium">{profile.name || "Not provided"}</p>
                    <p className="text-gray-600">{profile.specialization || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaHospital className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Hospital
                    </h3>
                    <p className="text-gray-900">{profile.hospital || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaPhone className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Contact Number
                    </h3>
                    <p className="text-gray-900">{profile.contactNumber || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaInfoCircle className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Bio
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {profile.bio || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaInfoCircle className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Date of Birth
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {profile.dateOfBirth || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaInfoCircle className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Address
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {profile.address || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaInfoCircle className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Phone Number
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {profile.phoneNumber || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaInfoCircle className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Qualification
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {profile.qualification || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaInfoCircle className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Experience Years
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {profile.experienceYears || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaInfoCircle className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Consultation Fee
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {profile.consultationFee || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <FaInfoCircle className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Availability
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line">
                      {profile.availabilityStart && profile.availabilityEnd
                        ? `${profile.availabilityStart} - ${profile.availabilityEnd}`
                        : "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSubmit}
          >
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {isProfileCreated ? "Update Profile" : "Create Profile"}
              </h2>
              <motion.button
                type="button"
                className="text-gray-500 hover:text-gray-700 transition-colors"
                onClick={() => setIsProfileCreated(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTimes className="text-xl" />
              </motion.button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-gray-600 font-semibold text-sm uppercase flex items-center gap-2"><FaUserMd /> Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                    placeholder="Dr. John Smith"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-semibold text-sm uppercase flex items-center gap-2"><FaGraduationCap /> Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={profile.specialization}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                    placeholder="Cardiologist"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-semibold text-sm uppercase flex items-center gap-2"><FaGraduationCap /> Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    value={profile.qualification}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-semibold text-sm uppercase flex items-center gap-2"><FaClock /> Experience (Years)</label>
                  <input
                    type="number"
                    name="experienceYears"
                    value={profile.experienceYears}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-semibold text-sm uppercase flex items-center gap-2"><FaDollarSign /> Consultation Fee</label>
                  <input
                    type="number"
                    name="consultationFee"
                    value={profile.consultationFee}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-semibold text-sm uppercase flex items-center gap-2"><FaHospital /> Hospital</label>
                  <input
                    type="text"
                    name="hospital"
                    value={profile.hospital}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                    placeholder="City Medical Center"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-semibold text-sm uppercase flex items-center gap-2"><FaPhoneAlt /> Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                    placeholder="+92 300 1234567"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-semibold text-sm uppercase flex items-center gap-2"><FaCalendarAlt /> Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profile.dateOfBirth}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                    required
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-semibold text-sm uppercase flex items-center gap-2"><FaHome /> Address</label>
                  <textarea
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                    required
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label className="text-gray-600 font-semibold text-sm uppercase flex items-center gap-2"><BsInfoCircleFill /> Professional Bio</label>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                    placeholder="Brief description about your professional background..."
                    required
                  />
                </div>
              </div>

              <div className="flex">
                <label className="text-gray-600 font-semibold  uppercase flex items-center gap-2 mb-1 me-5">
                  <FaClock /> Availability
                </label>
                <div className="flex flex-wrap gap-4 ">
                  {/* From Time */}
                  <div className="flex">
                    <label className="text-gray-600 text-xs font-medium me-4 mt-4">FROM</label>
                    <input
                      type="time"
                      name="availabilityStart"
                      value={profile.availabilityStart}
                      onChange={handleChange}
                      required
                      className="p-3 border border-gray-300 rounded-lg min-w-[150px]"
                    />
                  </div>

                  {/* To Time */}
                  <div className="flex ">
                    <label className="text-gray-600 text-xs font-medium ms-2 me-6 mt-4">TO</label>
                    <input
                      type="time"
                      name="availabilityEnd"
                      value={profile.availabilityEnd}
                      onChange={handleChange}
                      required
                      className="p-3 border border-gray-300 rounded-lg min-w-[150px]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <motion.button
                  type="button"
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsProfileCreated(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Save Profile
                </motion.button>
              </div>
            </div>
          </motion.form>
        )}

        {/* Profile Not Created Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 w-full max-w-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200 flex items-center">
                  <FiAlertCircle className="text-yellow-500 mr-2 text-xl" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Profile Required
                  </h2>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    You need to create a profile to access all features of the application.
                    Would you like to create one now?
                  </p>

                  <div className="flex justify-end space-x-4">
                    <motion.button
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={handleCancelCreateProfile}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Maybe Later
                    </motion.button>
                    <motion.button
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      onClick={handleCreateProfile}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Create Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 w-full max-w-md"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200 flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2 text-xl" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Success
                  </h2>
                </div>

                <div className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-green-500 text-3xl" />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Your profile has been {isProfileCreated ? "updated" : "created"} successfully!
                  </p>

                  <motion.button
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={handleSuccessModalClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MyProfile;