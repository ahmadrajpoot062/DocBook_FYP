import { React, useEffect } from 'react';
import { colors } from '../../Constants/Colors';
import { motion } from 'framer-motion';
import {
  FaClock,
  FaUser,
  FaStethoscope,
  FaHospital,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaStar,
  FaRegStar
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 10 },
  },
  hover: {
    y: -5,
    boxShadow: `0px 10px 20px ${colors.primary}20`,
    transition: { type: "spring", stiffness: 300 },
  },
};

const doctorData = {
  name: "Dr. John Doe",
  specialty: "Cardiologist",
  experience: "15 Years",
  waitTime: "30 mins",
  avgTimeToPatient: "20 mins",
  diagnosisSatisfaction: "95%",
  qualification: "MBBS, FCPS (Cardiology)",
  timings: "Monday - Friday: 10:00 AM - 4:00 PM",
  charges: "2000 PKR",
  address: "Near Old Anarkali, Mayo Hospital, Lahore",
  image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  rating: 4.8,
  languages: ["English", "Urdu", "Punjabi"],
  about: "Dr. John Doe is a board-certified cardiologist with extensive experience in treating heart conditions. He completed his fellowship at Johns Hopkins Hospital and has published numerous research papers in cardiology journals. Dr. Doe specializes in interventional cardiology and preventive heart care."
};

const renderRating = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-sm md:text-base" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-sm md:text-base" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400 text-sm md:text-base" />);
    }
  }

  return (
    <div className="flex items-center">
      <div className="flex mr-1">{stars}</div>
      <span className="text-xs md:text-sm font-medium ml-1">{rating}</span>
    </div>
  );
};

const DoctorProfile = () => {

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex justify-end mb-3 sm:mb-4">
            <NavLink to="/Patient/Doctors">
              <motion.div
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center border border-blue-500 text-blue-600"
                whileHover={{
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FaArrowLeft className="mr-1 sm:mr-2 text-xs sm:text-sm" />
                <span>Back to Doctors</span>
              </motion.div>
            </NavLink>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Doctor <span className="text-blue-600">Profile</span>
          </h1>
          <motion.div
            className="w-20 sm:w-24 h-1 sm:h-1.5 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
            initial={{ width: 0 }}
            animate={{ width: "5rem" }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-600 mt-4 sm:mt-6 max-w-2xl mx-auto"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Comprehensive information about the doctor and their practice
          </motion.p>
        </motion.div>

        {/* Main Profile Card */}
        <motion.div
          className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden border border-gray-100"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Doctor Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row items-center">
              <motion.div
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 shadow-md sm:shadow-lg mb-4 sm:mb-0 sm:mr-6 md:mr-8"
                style={{ borderColor: colors.secondary || "#ffffff" }}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={doctorData.image}
                  alt="Doctor"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300?text=Doctor";
                  }}
                />
              </motion.div>

              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">
                  {doctorData.name}
                </h2>
                <h3 className="text-sm sm:text-base md:text-xl text-blue-100 mb-2 sm:mb-3">
                  {doctorData.specialty}
                </h3>

                <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                  <div className="bg-blue-400 bg-opacity-30 px-2 sm:px-3 py-1 rounded-full flex items-center">
                    <FaUser className="mr-1 sm:mr-2 text-xs sm:text-sm text-blue-100" />
                    <span className="text-white text-xs sm:text-sm">{doctorData.experience} Exp</span>
                  </div>

                  <div className="bg-blue-400 bg-opacity-30 px-2 sm:px-3 py-1 rounded-full flex items-center">
                    <FaCheckCircle className="mr-1 sm:mr-2 text-xs sm:text-sm text-blue-100" />
                    <span className="text-white text-xs sm:text-sm">{doctorData.diagnosisSatisfaction} Sat</span>
                  </div>

                  <div className="bg-blue-400 bg-opacity-30 px-2 sm:px-3 py-1 rounded-full flex items-center">
                    <FaMapMarkerAlt className="mr-1 sm:mr-2 text-xs sm:text-sm text-blue-100" />
                    <span className="text-white text-xs sm:text-sm">Lahore</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
              {/* Left Column */}
              <div className="lg:w-1/3">
                {/* About Section */}
                <motion.div
                  className="mb-6 md:mb-8"
                  variants={cardVariants}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                    <FaUser className="text-blue-500 mr-2 text-sm sm:text-base" />
                    About
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    {doctorData.about}
                  </p>
                </motion.div>

                {/* Statistics Section */}
                <motion.div
                  className="bg-blue-50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-6 md:mb-8"
                  variants={cardVariants}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                    <FaStethoscope className="text-blue-500 mr-2 text-sm sm:text-base" />
                    Statistics
                  </h3>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Rating</span>
                      {renderRating(doctorData.rating)}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Wait Time</span>
                      <span className="text-xs sm:text-sm md:text-base font-bold text-gray-900">{doctorData.waitTime}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Avg. Consultation</span>
                      <span className="text-xs sm:text-sm md:text-base font-bold text-gray-900">{doctorData.avgTimeToPatient}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">Languages</span>
                      <span className="text-xs sm:text-sm md:text-base font-bold text-gray-900">{doctorData.languages.join(', ')}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="lg:w-2/3 lg:pl-0 xl:pl-6">
                {/* Qualification Section */}
                <motion.div
                  className="mb-6 md:mb-8"
                  variants={cardVariants}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                    <FaHospital className="text-blue-500 mr-2 text-sm sm:text-base" />
                    Qualification & Experience
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                    <p className="text-sm sm:text-base text-gray-900 font-medium">{doctorData.qualification}</p>
                  </div>
                </motion.div>

                {/* Availability Section */}
                <motion.div
                  className="mb-6 md:mb-8"
                  variants={cardVariants}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                    <FaCalendarAlt className="text-blue-500 mr-2 text-sm sm:text-base" />
                    Availability
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Consultation Hours
                      </h4>
                      <p className="text-sm sm:text-base text-gray-900">{doctorData.timings}</p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Consultation Fee
                      </h4>
                      <p className="text-sm sm:text-base text-gray-900">{doctorData.charges}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Location Section */}
                <motion.div
                  className="mb-6 md:mb-8"
                  variants={cardVariants}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                    <FaMapMarkerAlt className="text-blue-500 mr-2 text-sm sm:text-base" />
                    Location
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                    <p className="text-sm sm:text-base text-gray-900">{doctorData.address}</p>
                    <div className="mt-3 sm:mt-4 h-40 sm:h-48 bg-gray-200 rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://maps.app.goo.gl/8Smh3EvRkgermVi38`}
                        allowFullScreen
                      >
                      </iframe>
                    </div>
                  </div>
                </motion.div>

                <div className="flex justify-center mt-6 sm:mt-8">
                  <NavLink to={`Book_Appointment`}>
                    <motion.button
                      whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                      whileTap={{ scale: 0.97 }}
                      className="block px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-bold shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                      style={{
                        backgroundColor: colors.primary,
                        backgroundImage: "linear-gradient(to right, #3B82F6, #2563EB)"
                      }}
                    >
                      <FaCalendarAlt className="text-white" />
                      Book Appointment
                    </motion.button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DoctorProfile;