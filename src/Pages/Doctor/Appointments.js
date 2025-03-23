import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaSearch, FaExclamationTriangle, FaTimes, FaCheck } from "react-icons/fa";
import { colors } from '../../Constants/Colors'; // Import colors
import { motion, AnimatePresence } from 'framer-motion'; // Import for animations

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchDate, setSearchDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

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

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      const mockAppointments = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        patientName: `Patient ${i + 1}`,
        patientEmail: `patient${i + 1}@example.com`,
        date: `2024-02-${String(i % 30 + 1).padStart(2, '0')}`, // Random dates in February 2024
        time: "10:00 AM"
      }));
      setAppointments(mockAppointments);
      setFilteredAppointments(mockAppointments); // Initialize filtered appointments
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = () => {
    if (searchDate) {
      const filtered = appointments.filter(appointment => appointment.date === searchDate);
      setFilteredAppointments(filtered);
      setCurrentPage(1); // Reset to the first page after search
    } else {
      setFilteredAppointments(appointments); // Reset to all appointments if no date is selected
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

  return (
    <div 
      className="min-h-screen p-4 sm:p-6"
      style={{ backgroundColor: colors.background }}
    >
      {/* Professional header */}
      <motion.div
        className="w-full max-w-5xl mx-auto mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 
            className="text-2xl sm:text-3xl font-bold mb-2"
            style={{ color: colors.black }}
          >
            Appointments
          </h1>
          <div className="w-24 h-1 mx-auto mb-4" style={{ backgroundColor: colors.primary }}></div>
          <p className="text-sm sm:text-base" style={{ color: colors.black }}>
            View and manage your scheduled appointments with patients
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
        {/* Header - Updated with primary background */}
        <div 
          className="p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
          style={{ backgroundColor: colors.primary }}
        >
          <motion.div 
            className="flex items-center"
            variants={itemVariants}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <FaCalendarAlt style={{ color: colors.white }} />
            </div>
            <h2 
              className="text-xl font-bold"
              style={{ color: colors.white }}
            >
              Appointments List
            </h2>
          </motion.div>
          
          <motion.div 
            className="flex"
            variants={itemVariants}
          >
            <input 
              type="date" 
              className="border p-2 rounded-l-md focus:outline-none" 
              style={{ borderColor: colors.white }}
              value={searchDate} 
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <motion.button 
              className="p-2 rounded-r-md flex items-center justify-center"
              style={{ backgroundColor: colors.secondary, color: colors.primary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
            >
              <FaSearch />
            </motion.button>
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="p-4 sm:p-6 bg-white">
          <AnimatePresence>
            {loading ? (
              <motion.div 
                className="flex justify-center items-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-12 h-12 border-t-4 border-b-4 rounded-full animate-spin" 
                     style={{ borderColor: colors.primary }}></div>
              </motion.div>
            ) : filteredAppointments.length === 0 ? (
              <motion.div 
                className="flex flex-col items-center py-12"
                variants={itemVariants}
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${colors.red}15` }}
                >
                  <FaExclamationTriangle style={{ color: colors.red, fontSize: "1.5rem" }} />
                </div>
                <h2 
                  className="text-xl font-bold mb-2"
                  style={{ color: colors.black }}
                >
                  No Appointments Found
                </h2>
                <p style={{ color: colors.black }}>No appointments match the selected date</p>
              </motion.div>
            ) : (
              <>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  variants={containerVariants}
                >
                  {currentAppointments.map((appointment) => (
                    <motion.div 
                      key={appointment.id} 
                      className="p-4 rounded-lg shadow-sm"
                      style={{ backgroundColor: colors.secondary }}
                      variants={itemVariants}
                    >
                      <h3 
                        className="text-lg font-semibold mb-2"
                        style={{ color: colors.black }}
                      >
                        {appointment.patientName}
                      </h3>
                      <p 
                        className="text-sm mb-2"
                        style={{ color: colors.black }}
                      >
                        {appointment.patientEmail}
                      </p>
                      <p 
                        className="flex items-center text-sm mb-3"
                        style={{ color: colors.black }}
                      >
                        <FaCalendarAlt className="mr-2" style={{ color: colors.primary }} />
                        {appointment.date} at {appointment.time}
                      </p>
                      <motion.button 
                        className="w-full p-2 rounded-lg text-sm font-medium flex items-center justify-center"
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
                        Cancel Appointment
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.div 
                  className="flex justify-between items-center mt-6"
                  variants={itemVariants}
                >
                  <motion.button 
                    className="px-4 py-2 rounded-lg text-sm font-medium"
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
                  
                  <p style={{ color: colors.black }}>
                    Page {currentPage} of {Math.ceil(filteredAppointments.length / itemsPerPage)}
                  </p>
                  
                  <motion.button 
                    className="px-4 py-2 rounded-lg text-sm font-medium"
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
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="rounded-lg shadow-xl max-w-md w-full relative overflow-hidden"
              style={{ backgroundColor: colors.secondary }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Modal header */}
              <div 
                className="p-4 relative"
                style={{ backgroundColor: colors.primary }}
              >
                <h2 
                  className="text-xl font-bold text-center"
                  style={{ color: colors.white }}
                >
                  Confirm Cancellation
                </h2>
                <motion.button
                  className="absolute right-4 top-4 text-lg"
                  style={{ color: colors.white }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedAppointment(null)}
                >
                  <FaTimes />
                </motion.button>
              </div>
              
              {/* Modal content */}
              <div className="p-6">
                <p 
                  className="mb-6 text-center"
                  style={{ color: colors.black }}
                >
                  Do you want to cancel the appointment with <span className="font-bold" style={{ color: colors.black }}>{selectedAppointment.patientName}</span> on {selectedAppointment.date} at {selectedAppointment.time}?
                </p>
                
                <div className="flex justify-center gap-4">
                  <motion.button 
                    className="px-5 py-2 rounded-lg text-sm font-medium flex items-center"
                    style={{ 
                      backgroundColor: colors.red,
                      color: colors.white
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAppointment(null)}
                  >
                    <FaTimes className="mr-2" />
                    No, Keep It
                  </motion.button>
                  
                  <motion.button 
                    className="px-5 py-2 rounded-lg text-sm font-medium flex items-center"
                    style={{ 
                      backgroundColor: colors.primary,
                      color: colors.white
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaCheck className="mr-2" />
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

export default Appointments;