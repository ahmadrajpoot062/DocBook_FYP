import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaSearch, FaExclamationTriangle, FaTimes, FaCheck, FaUserMd } from "react-icons/fa";
import { colors } from '../../Constants/Colors';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Services/ApiService';

const PatientAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchDate, setSearchDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [statusFilter, setStatusFilter] = useState('Pending'); // Default filter is 'Pending'

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4);
      } else if (window.innerWidth < 768) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(10);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStatusFilterChange = (event) => {
    const status = event.target.value;
    setStatusFilter(status);
    if (status === 'All') {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter((appointment) => appointment.status === status);
      setFilteredAppointments(filtered);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);

        // Fetch appointments by patient email
        const appointmentsData = await ApiService.getAppointmentsByPatientEmail(localStorage.getItem('userEmail'));

        // Fetch doctor details for each appointment
        const appointmentsWithDoctorDetails = await Promise.all(
          appointmentsData.map(async (appointment) => {
            try {
              const doctorData = await ApiService.getDoctorById(appointment.doctorId); // Fetch doctor details by ID
              const userData = await ApiService.getUserDetails(doctorData.userId); // Fetch user details by ID
              return {
                ...appointment,
                doctorName: userData.userName || "Unknown Doctor",
                doctorSpecialty: doctorData.specialization || "General",
              };
            } catch (error) {
              console.error(`Error fetching doctor details for doctor ID ${appointment.doctorId}:`, error);
              return {
                ...appointment,
                doctorName: "Unknown Doctor",
                doctorSpecialty: "General",
              };
            }
          })
        );

        setAppointments(appointmentsWithDoctorDetails);
        setFilteredAppointments(appointmentsWithDoctorDetails.filter((appointment) => appointment.status === 'Pending'));
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const cancelAppointment = async (appointmentId) => {
    try {
      setLoading(true);
      await ApiService.removeAppointment(appointmentId); // Call API to cancel the appointment
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: 'Cancelled' }
          : appointment
      );
      setAppointments(updatedAppointments);
      setFilteredAppointments(updatedAppointments);
      setSelectedAppointment(null);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchDate) {
      const filtered = appointments.filter(
        (appointment) => appointment.date === searchDate && appointment.status !== 'Cancelled'
      );
      setFilteredAppointments(filtered);
      setCurrentPage(1);
    } else {
      const filtered = appointments.filter((appointment) => appointment.status !== 'Cancelled');
      setFilteredAppointments(filtered);
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredAppointments.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return colors.pending;
      case 'Completed': return colors.completed;
      case 'Cancelled': return colors.cancelled;
      case 'Approved': return colors.approved;
      default: return colors.black;
    }
  };
  return (
    <div
      className="min-h-screen p-3 sm:p-4 md:p-6"
      style={{ backgroundColor: colors.background }}
    >
      {/* Professional header */}
      <motion.div
        className="w-full max-w-5xl mx-auto mb-4 sm:mb-6 mt-10 md:mt-7 lg:mt-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-2"
            style={{ color: colors.black }}
          >
            My Appointments
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto mb-3 sm:mb-4" style={{ backgroundColor: colors.primary }}></div>
          <p className="text-xs sm:text-sm md:text-base" style={{ color: colors.black }}>
            View and manage your medical appointments
          </p>
        </div>
      </motion.div>

      <motion.div
        className="max-w-5xl mx-auto shadow-lg rounded-lg overflow-hidden"
        style={{ backgroundColor: colors.secondary }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div
          className="p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4"
          style={{ backgroundColor: colors.primary }}
        >
          <motion.div
            className="flex items-center"
            variants={itemVariants}
          >
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-2 sm:mr-3"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <FaCalendarAlt className="text-sm sm:text-base" style={{ color: colors.white }} />
            </div>
            <h2
              className="text-lg sm:text-xl font-bold"
              style={{ color: colors.white }}
            >
              Your Scheduled Appointments
            </h2>
          </motion.div>

          <motion.div
            className="flex w-full sm:w-auto"
            variants={itemVariants}
          >
            <input
              type="date"
              className="border p-2 rounded-l-md focus:outline-none text-xs sm:text-sm w-full"
              style={{ borderColor: colors.white }}
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <motion.button
              className="p-2 rounded-r-md flex items-center justify-center text-sm sm:text-base"
              style={{ backgroundColor: colors.secondary, color: colors.primary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
            >
              <FaSearch />
            </motion.button>
          </motion.div>
          <motion.div className="flex justify-center mb-4 ">
            <div className="w-full sm:w-64">
              <label className="block text-sm font-medium mb-1" style={{ color: colors.white }}>
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="w-full px-4 py-2 rounded-lg text-sm font-medium border focus:outline-none shadow-sm transition duration-200"
                style={{
                  backgroundColor: colors.white,
                  color: colors.black,
                  borderColor: colors.primary,
                  boxShadow: `0 0 0 1px ${colors.primary}33`,
                }}
                onFocus={(e) => e.target.style.boxShadow = `0 0 0 2px ${colors.primary}`}
                onBlur={(e) => e.target.style.boxShadow = `0 0 0 1px ${colors.primary}33`}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Approved">Approved</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </motion.div>

        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-6 bg-white">
          <AnimatePresence>
            {loading ? (
              <motion.div
                className="flex justify-center items-center py-8 sm:py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-t-4 border-b-4 rounded-full animate-spin"
                  style={{ borderColor: colors.primary }}></div>
              </motion.div>
            ) : filteredAppointments.length === 0 ? (
              <motion.div
                className="flex flex-col items-center py-8 sm:py-12"
                variants={itemVariants}
              >
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4"
                  style={{ backgroundColor: `${colors.red}15` }}
                >
                  <FaExclamationTriangle className="text-lg sm:text-xl" style={{ color: colors.red }} />
                </div>
                <h2
                  className="text-lg sm:text-xl font-bold mb-1 sm:mb-2"
                  style={{ color: colors.black }}
                >
                  No Appointments Found
                </h2>
                <p className="text-xs sm:text-sm" style={{ color: colors.black }}>
                  {searchDate ? 'No appointments on the selected date' : 'You have no scheduled appointments'}
                </p>
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                  variants={containerVariants}
                >
                  {currentAppointments.map((appointment) => (
                    <motion.div
                      key={appointment.id}
                      className="p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100"
                      style={{ backgroundColor: colors.secondary }}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-start mb-2 sm:mb-3">
                        <div
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-1"
                          style={{ backgroundColor: `${colors.primary}20` }}
                        >
                          <FaUserMd style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <h3
                            className="text-base sm:text-lg font-semibold"
                            style={{ color: colors.black }}
                          >
                            {appointment.doctorName}
                          </h3>
                          <p
                            className="text-xs sm:text-sm"
                            style={{ color: colors.black }}
                          >
                            {appointment.doctorSpecialty}
                          </p>
                        </div>
                      </div>

                      <div className="mb-2 sm:mb-3">
                        <p
                          className="flex items-center text-xs sm:text-sm mb-1"
                          style={{ color: colors.black }}
                        >
                          <FaCalendarAlt className="mr-1 sm:mr-2 text-xs sm:text-sm" style={{ color: colors.primary }} />
                          {new Date(appointment.appointmentDate).toDateString()} at {appointment.bookedSlots.split('-')[0]}
                        </p>
                        <p className="text-xs sm:text-sm" style={{ color: colors.black }}>
                          Location: {appointment.location}
                        </p>
                      </div>

                      <div className="flex justify-between items-center">
                        <span
                          className="text-xs sm:text-sm px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: `${getStatusColor(appointment.status)}20`,
                            color: getStatusColor(appointment.status)
                          }}
                        >
                          {appointment.status}
                        </span>

                        {appointment.status === 'Pending' && (
                          <motion.button
                            className="px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium"
                            style={{
                              backgroundColor: `${colors.red}10`,
                              color: colors.red,
                              border: `1px solid ${colors.red}20`,
                            }}
                            whileHover={{
                              backgroundColor: colors.red,
                              color: colors.white
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedAppointment(appointment)}
                          >
                            Cancel
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 gap-3 sm:gap-0"
                  variants={itemVariants}
                >
                  <motion.button
                    className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium w-full sm:w-auto"
                    style={{
                      backgroundColor: currentPage === 1 ? `${colors.primary}30` : colors.primary,
                      color: currentPage === 1 ? colors.black : colors.white,
                      opacity: currentPage === 1 ? 0.7 : 1
                    }}
                    whileHover={currentPage !== 1 ? { scale: 1.03 } : {}}
                    whileTap={currentPage !== 1 ? { scale: 0.97 } : {}}
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </motion.button>

                  <p className="text-xs sm:text-sm" style={{ color: colors.black }}>
                    Page {currentPage} of {Math.ceil(filteredAppointments.length / itemsPerPage)}
                  </p>

                  <motion.button
                    className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium w-full sm:w-auto"
                    style={{
                      backgroundColor: currentPage === Math.ceil(filteredAppointments.length / itemsPerPage) ? `${colors.primary}30` : colors.primary,
                      color: currentPage === Math.ceil(filteredAppointments.length / itemsPerPage) ? colors.black : colors.white,
                      opacity: currentPage === Math.ceil(filteredAppointments.length / itemsPerPage) ? 0.7 : 1
                    }}
                    whileHover={currentPage !== Math.ceil(filteredAppointments.length / itemsPerPage) ? { scale: 1.03 } : {}}
                    whileTap={currentPage !== Math.ceil(filteredAppointments.length / itemsPerPage) ? { scale: 0.97 } : {}}
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(filteredAppointments.length / itemsPerPage)}
                  >
                    Next
                  </motion.button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedAppointment && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-lg shadow-xl max-w-xs sm:max-w-sm md:max-w-md w-full relative overflow-hidden"
              style={{ backgroundColor: colors.secondary }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Modal header */}
              <div
                className="p-3 sm:p-4 relative"
                style={{ backgroundColor: colors.primary }}
              >
                <h2
                  className="text-lg sm:text-xl font-bold text-center"
                  style={{ color: colors.white }}
                >
                  Confirm Cancellation
                </h2>
                <motion.button
                  className="absolute right-3 sm:right-4 top-3 sm:top-4 text-base sm:text-lg"
                  style={{ color: colors.white }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedAppointment(null)}
                >
                  <FaTimes />
                </motion.button>
              </div>

              {/* Modal content */}
              <div className="p-4 sm:p-6">
                <p
                  className="mb-4 sm:mb-6 text-center text-xs sm:text-sm"
                  style={{ color: colors.black }}
                >
                  Do you want to cancel your appointment with <span className="font-bold">{selectedAppointment.doctorName}</span> ({selectedAppointment.doctorSpecialty}) on {selectedAppointment.date} at {selectedAppointment.time}?
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 md:gap-4">
                  <motion.button
                    className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center"
                    style={{
                      backgroundColor: colors.red,
                      color: colors.white
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAppointment(null)}
                  >
                    <FaTimes className="mr-1 sm:mr-2" />
                    No, Keep It
                  </motion.button>

                  <motion.button
                    className="px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.white
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      cancelAppointment(selectedAppointment.id);
                      navigate('AppointmentCancelled'); // Add this line
                    }} // Call cancelAppointment here
                  >
                    <FaCheck className="mr-1 sm:mr-2" />
                    Yes, Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PatientAppointments;