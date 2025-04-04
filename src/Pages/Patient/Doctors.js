import React, { useEffect, useState } from 'react';
import {
  FaUserMd,
  FaArrowLeft,
  FaClock,
  FaMoneyBillWave,
  FaGraduationCap,
  FaHospital,
  FaSearch,
  FaFilter,
  FaStar,
  FaRegStar,
  FaCalendarAlt
} from "react-icons/fa";
import { motion } from "framer-motion";
import { NavLink } from 'react-router-dom';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(6);
  const [filters, setFilters] = useState({
    speciality: '',
    experience: '',
    maxFee: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('relevance');

  useEffect(() => {
    setTimeout(() => {
      const specialties = [
        { name: 'Cardiology', color: '#3B82F6', icon: <FaHospital className="text-blue-500" /> },
        { name: 'Neurology', color: '#6366F1', icon: <FaHospital className="text-indigo-500" /> },
        { name: 'Pediatrics', color: '#10B981', icon: <FaHospital className="text-emerald-500" /> },
        { name: 'Orthopedics', color: '#F59E0B', icon: <FaHospital className="text-amber-500" /> },
        { name: 'Dermatology', color: '#EC4899', icon: <FaHospital className="text-pink-500" /> },
        { name: 'Oncology', color: '#8B5CF6', icon: <FaHospital className="text-violet-500" /> },
        { name: 'Gastroenterology', color: '#06B6D4', icon: <FaHospital className="text-cyan-500" /> }
      ];

      setDoctors(Array.from({ length: 24 }, (_, i) => ({
        id: i + 1,
        name: `Dr. ${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'][i % 7]} ${['A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'G.'][i % 7]}`,
        speciality: specialties[i % specialties.length],
        qualification: ['MD, Cardiology', 'MBBS, FCPS (Medicine)', 'MBBS, MRCP (UK)', 'MBBS, FRCS (Surgery)', 'MBBS, PhD (Neuroscience)'][i % 5],
        timings: ["9:00 AM - 1:00 PM", "2:00 PM - 6:00 PM", "6:00 PM - 10:00 PM"][i % 3],
        charges: `${1500 + (i % 15) * 500}`,
        experience: `${i % 15 + 1}`,
        consultationTime: `${15 + (i % 4) * 5} mins`,
        rating: (4 + Math.random()).toFixed(1),
        availableToday: i % 3 === 0,
        nextAvailable: i % 3 === 0 ? 'Today' : `In ${i % 3 + 1} days`,
        languages: ['English', 'Urdu'].concat(
          i % 2 === 0 ? ['Punjabi'] : [],
          i % 3 === 0 ? ['Sindhi'] : []
        )
      })));
      setLoading(false);
    }, 1200);
  }, []);

  // Filter doctors
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.speciality.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpeciality = filters.speciality ? doctor.speciality.name === filters.speciality : true;
    const matchesExperience = filters.experience ? parseInt(doctor.experience) >= parseInt(filters.experience) : true;
    const matchesMaxFee = filters.maxFee ? parseInt(doctor.charges) <= parseInt(filters.maxFee) : true;

    return matchesSearch && matchesSpeciality && matchesExperience && matchesMaxFee;
  });

  // Sort doctors
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (sortOption) {
      case 'highest-rated':
        return parseFloat(b.rating) - parseFloat(a.rating);
      case 'experience':
        return parseInt(b.experience) - parseInt(a.experience);
      case 'fee-low-high':
        return parseInt(a.charges) - parseInt(b.charges);
      case 'fee-high-low':
        return parseInt(b.charges) - parseInt(a.charges);
      default: // relevance
        return 0;
    }
  });

  // Pagination
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = sortedDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(sortedDoctors.length / doctorsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const specialities = [...new Set(doctors.map(doctor => doctor.speciality.name))];

  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-xs sm:text-sm" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400 text-xs sm:text-sm" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400 text-xs sm:text-sm" />);
      }
    }

    return (
      <div className="flex items-center">
        <div className="flex mr-1">{stars}</div>
        <span className="text-xs sm:text-sm font-medium">{rating}</span>
      </div>
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      boxShadow: "0px 10px 20px rgba(59, 130, 246, 0.1)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-6 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Find Your <span className="text-blue-600">Healthcare Specialist</span>
          </h1>
          <motion.div
            className="w-16 sm:w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
            initial={{ width: 0 }}
            animate={{ width: '5rem' }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          <motion.p
            className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4 max-w-2xl mx-auto"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Connect with experienced doctors and book appointments seamlessly
          </motion.p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          className="mb-6 sm:mb-10 bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Search by doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            <motion.button
              className="px-4 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter className="text-xs sm:text-sm" />
              <span className="hidden sm:inline">{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
              <span className="sm:hidden">Filters</span>
            </motion.button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              className="bg-blue-50 p-4 sm:p-5 rounded-lg sm:rounded-xl mt-3 sm:mt-4 border border-blue-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Specialty
                  </label>
                  <select
                    className="w-full p-2 sm:p-2.5 border rounded-lg text-xs sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                    value={filters.speciality}
                    onChange={(e) => setFilters({ ...filters, speciality: e.target.value })}
                  >
                    <option value="">All Specialties</option>
                    {specialities.map((spec, index) => (
                      <option key={index} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Minimum Experience
                  </label>
                  <select
                    className="w-full p-2 sm:p-2.5 border rounded-lg text-xs sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                    value={filters.experience}
                    onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                  >
                    <option value="">Any Experience</option>
                    <option value="5">5+ years</option>
                    <option value="10">10+ years</option>
                    <option value="15">15+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Maximum Fee (PKR)
                  </label>
                  <select
                    className="w-full p-2 sm:p-2.5 border rounded-lg text-xs sm:text-sm focus:ring-blue-500 focus:border-blue-500"
                    value={filters.maxFee}
                    onChange={(e) => setFilters({ ...filters, maxFee: e.target.value })}
                  >
                    <option value="">Any Fee</option>
                    <option value="2000">Under 2,000</option>
                    <option value="3000">Under 3,000</option>
                    <option value="5000">Under 5,000</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Applied Filters */}
          {(filters.speciality || filters.experience || filters.maxFee) && (
            <motion.div
              className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {filters.speciality && (
                <motion.span
                  className="text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center font-medium bg-blue-100 text-blue-800 border border-blue-200"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  Specialty: {filters.speciality}
                  <button
                    onClick={() => setFilters({ ...filters, speciality: '' })}
                    className="ml-1 sm:ml-2 text-xs sm:text-sm"
                  >
                    &times;
                  </button>
                </motion.span>
              )}
              {filters.experience && (
                <motion.span
                  className="text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center font-medium bg-blue-100 text-blue-800 border border-blue-200"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  Experience: {filters.experience}+ years
                  <button
                    onClick={() => setFilters({ ...filters, experience: '' })}
                    className="ml-1 sm:ml-2 text-xs sm:text-sm"
                  >
                    &times;
                  </button>
                </motion.span>
              )}
              {filters.maxFee && (
                <motion.span
                  className="text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center font-medium bg-blue-100 text-blue-800 border border-blue-200"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  Max Fee: {parseInt(filters.maxFee).toLocaleString()} PKR
                  <button
                    onClick={() => setFilters({ ...filters, maxFee: '' })}
                    className="ml-1 sm:ml-2 text-xs sm:text-sm"
                  >
                    &times;
                  </button>
                </motion.span>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Content */}
        {loading ? (
          <motion.div
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-t-transparent rounded-full animate-spin border-blue-500 border-opacity-30"></div>
              <p className="mt-3 text-xs sm:text-sm font-medium text-gray-600">
                Loading our specialist directory...
              </p>
            </div>
          </motion.div>
        ) : sortedDoctors.length === 0 ? (
          <motion.div
            className="bg-white rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-blue-50 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <FaUserMd className="text-blue-400 text-lg sm:text-xl" />
            </div>
            <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 sm:mb-2">
              No Doctors Found
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mb-3 sm:mb-4">
              {searchTerm || filters.speciality || filters.experience || filters.maxFee
                ? "Try adjusting your search criteria or filters"
                : "Our specialist directory is currently empty. Please check back later."}
            </p>
            {(searchTerm || filters.speciality || filters.experience || filters.maxFee) && (
              <motion.button
                className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSearchTerm('');
                  setFilters({ speciality: '', experience: '', maxFee: '' });
                }}
              >
                Clear All Filters
              </motion.button>
            )}
          </motion.div>
        ) : (
          <>
            {/* Results Summary and Sorting - Improved for Responsiveness */}
            <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
              <p className="text-xs sm:text-sm text-gray-600 break-words">
                Showing <span className="font-medium text-gray-900">
                  {indexOfFirstDoctor + 1}-{Math.min(indexOfLastDoctor, sortedDoctors.length)}
                </span> of <span className="font-medium text-gray-900">
                  {sortedDoctors.length}
                </span> specialists
              </p>

              {/* Improved Sort By section for better responsiveness */}
              <div className="flex items-center w-full sm:w-auto">
                <span className="text-xs sm:text-sm text-gray-600 mr-2 whitespace-nowrap">Sort by:</span>
                <select
                  className="text-xs sm:text-sm border rounded-lg p-1 sm:p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-grow sm:flex-grow-0 break-words truncate max-w-[190px] sm:max-w-none"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="highest-rated">Highest Rated</option>
                  <option value="experience">Experience</option>
                  <option value="fee-low-high">Fee (Low to High)</option>
                  <option value="fee-high-low">Fee (High to Low)</option>
                </select>
              </div>
            </div>

            <motion.div
              className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {currentDoctors.map((doctor) => (
                <motion.div
                  key={doctor.id}
                  className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full"
                  variants={cardVariants}
                  whileHover="hover"
                >
                  {/* Specialty Indicator */}
                  <div
                    className="h-1.5 w-full"
                    style={{ backgroundColor: doctor.speciality.color }}
                  ></div>

                  <div className="p-3 sm:p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2 sm:mb-3">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white shadow-sm mt-0.5 bg-blue-50 flex items-center justify-center">
                          <FaUserMd className="text-blue-400 text-lg sm:text-xl" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-0.5 break-words">
                            {doctor.name}
                          </h3>
                          <div className="flex items-center gap-1">
                            <span
                              className="inline-block text-xs px-1.5 py-0.5 rounded-full font-medium break-words"
                              style={{
                                backgroundColor: `${doctor.speciality.color}20`,
                                color: doctor.speciality.color
                              }}
                            >
                              {doctor.speciality.name}
                            </span>
                          </div>
                        </div>
                      </div>
                      {renderRating(doctor.rating)}
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm mb-3 sm:mb-4 flex-grow">
                      <div className="flex items-start">
                        <div className="text-blue-500 mr-2 mt-0.5 flex-shrink-0">
                          {doctor.speciality.icon}
                        </div>
                        <span className="text-gray-700 break-words">{doctor.qualification}</span>
                      </div>

                      <div className="flex items-start">
                        <svg className="w-3.5 h-3.5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-700 break-words">{doctor.experience} years experience</span>
                      </div>

                      <div className="flex items-start">
                        <FaClock className="text-blue-500 mr-2 mt-0.5 flex-shrink-0 text-xs sm:text-sm" />
                        <span className="text-gray-700 break-words">{doctor.timings}</span>
                      </div>

                      <div className="flex items-start">
                        <FaMoneyBillWave className="text-blue-500 mr-2 mt-0.5 flex-shrink-0 text-xs sm:text-sm" />
                        <span className="text-gray-700 break-words">{doctor.charges} PKR consultation fee</span>
                      </div>

                      <div className="flex items-start">
                        <svg className="w-3.5 h-3.5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                        <span className="text-gray-700 break-words">Speaks: {doctor.languages.join(', ')}</span>
                      </div>

                      {doctor.availableToday && (
                        <div className="flex items-start">
                          <FaCalendarAlt className="text-blue-500 mr-2 mt-0.5 flex-shrink-0 text-xs sm:text-sm" />
                          <span className="text-gray-700 font-medium break-words">Available Today</span>
                        </div>
                      )}
                    </div>

                    {/* Buttons fixed at bottom */}
                    <div className="flex gap-2 sm:gap-3 mt-auto pt-1">
                      {/* <motion.a 
                        href={`/Patient/Doctor_Profile?id=${doctor.id}`} 
                        className="flex-1 text-center py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border border-blue-500 text-blue-600"
                        whileHover={{ 
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Profile
                      </motion.a> */}
                      <NavLink
                        to={`Doctor_Profile`}
                        className="flex-1 text-center py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border border-blue-500 text-blue-600"
                      >
                        View Profile
                      </NavLink>
                      <NavLink
                        to={`Book_Appointment`}
                        className="flex-1 text-center py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                      >
                        <motion.span
                          whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Appoint Now
                        </motion.span>
                      </NavLink>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="flex justify-center mt-6 sm:mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <nav className="flex items-center gap-1">
                  <motion.button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium flex items-center border"
                    style={{
                      color: currentPage === 1 ? "#9CA3AF" : "#3B82F6",
                      borderColor: currentPage === 1 ? "#E5E7EB" : "#3B82F6"
                    }}
                    whileHover={currentPage !== 1 ? {
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      transition: { duration: 0.2 }
                    } : {}}
                  >
                    <FaArrowLeft className="mr-0.5 text-xs sm:text-sm" />
                    <span>Prev</span>
                  </motion.button>

                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage <= 2) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 1) {
                      pageNum = totalPages - 2 + i;
                    } else {
                      pageNum = currentPage - 1 + i;
                    }

                    return (
                      <motion.button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium mx-0.5 min-w-[28px] sm:min-w-[32px] border ${currentPage === pageNum
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-transparent'
                          : 'border-gray-300 text-gray-700'
                          }`}
                        whileHover={currentPage !== pageNum ? {
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          transition: { duration: 0.2 }
                        } : {}}
                      >
                        {pageNum}
                      </motion.button>
                    );
                  })}

                  {totalPages > 3 && currentPage < totalPages - 1 && (
                    <span className="px-1 text-xs sm:text-sm text-gray-500">...</span>
                  )}

                  {totalPages > 3 && currentPage < totalPages - 1 && (
                    <motion.button
                      onClick={() => paginate(totalPages)}
                      className="px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium mx-0.5 min-w-[28px] sm:min-w-[32px] border border-gray-300 text-gray-700"
                      whileHover={{
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      {totalPages}
                    </motion.button>
                  )}

                  <motion.button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium flex items-center border"
                    style={{
                      color: currentPage === totalPages ? "#9CA3AF" : "#3B82F6",
                      borderColor: currentPage === totalPages ? "#E5E7EB" : "#3B82F6"
                    }}
                    whileHover={currentPage !== totalPages ? {
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      transition: { duration: 0.2 }
                    } : {}}
                  >
                    <span>Next</span>
                    <FaArrowLeft className="ml-0.5 text-xs sm:text-sm transform rotate-180" />
                  </motion.button>
                </nav>
              </motion.div>
            )}
          </>
        )}

        {/* Back Button */}
        <motion.div
          className="flex justify-center mt-6 sm:mt-8 md:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <NavLink to="/">
            <motion.div
              className="px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center border border-blue-500 text-blue-600"
              whileHover={{
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <FaArrowLeft className="mr-1 sm:mr-2 text-xs sm:text-sm" />
              <span className="hidden sm:inline">Back to Patient Dashboard</span>
              <span className="sm:hidden">Back</span>
            </motion.div>
          </NavLink>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Doctors;