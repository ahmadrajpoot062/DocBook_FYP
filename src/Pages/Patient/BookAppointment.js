import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  FaClock,
  FaCalendarAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaStar,
  FaRegStar,
  FaTimes,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Services/ApiService';


// Animation variants (unchanged)
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
    boxShadow: "0px 10px 20px rgba(59, 130, 246, 0.1)",
    transition: { type: "spring", stiffness: 300 },
  },
};

const renderRating = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-sm" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400 text-sm" />);
    }
  }

  return (
    <div className="flex items-center">
      <div className="flex mr-1">{stars}</div>
      <span className="text-xs font-medium ml-1">{rating}</span>
    </div>
  );
};

const BookAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appointmentDate, setAppointmentDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [patientId, setPatientId] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  const patientEmail = localStorage.getItem("userEmail");

  const doctorData = {
    id: location.state?.doctor?.id,
    name: location.state?.doctor.name || "Dr. John Doe",
    specialty: location.state?.doctor.speciality || "Cardiologist",
    experience: location.state?.doctor.experience || "15 Years",
    rating: 4.8,
    timings: "Monday - Friday: "+location.state?.doctor.timings || "Monday - Friday: 10:00 AM - 4:00 PM",
    charges: location.state?.doctor.charges + " PKR" || "2000 PKR",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  };
  
  useEffect(() => {
    const fetchPatientId = async () => {
      try {
        const data = await ApiService.getPatientByEmail(patientEmail);
        setPatientId(data.id);
      } catch (error) {
        console.error("Error fetching patient ID:", error);
      }
    };

    if (patientEmail) {
      fetchPatientId();
    }
  }, [patientEmail]);

  const fetchBookedSlots = async (date) => {
    try {
      const data = await ApiService.getBookedSlots(doctorData.id, date);
      setBookedSlots(data);
    } catch (error) {
      console.error("Error fetching booked slots:", error);
    }
  };

  useEffect(() => {
    if (appointmentDate) {
      fetchBookedSlots(appointmentDate);
    }
  }, [appointmentDate]);

  const showAvailableSlots = async (event) => {
    event.preventDefault();
    if (!appointmentDate || !doctorData.timings) return;
  
    const timeRange = doctorData.timings.replace("Monday - Friday: ", "").replace(" ", "").replace("–", "-");
  
    try {
      const data = await ApiService.getAvailableTimeSlots(timeRange, 15);
      setAvailableSlots(data);
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };
  

  const confirmAppointment = async () => {
    if (!appointmentDate || !selectedSlot || !patientId) return;

    try {
      const appointmentData = {
        doctorId: doctorData.id,
        patientId: patientId,
        appointmentDate: appointmentDate,
        bookedSlots: selectedSlot,
        status: "Pending",
        notes: "",
      };

      const response = await ApiService.bookAppointment(appointmentData);

      if (response.status === 201) {
        navigate("Request_submitted");
      } else {
        console.error("Failed to create appointment:", response);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    } finally {
      setShowModal(false);
      setSelectedSlot(null);
      setAppointmentDate("");
      setAvailableSlots([]);
    }
  };

  const handleDateInputClick = () => {
    setShowCalendarModal(true);
  };

  // Generate days for the calendar
  const generateDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 sm:h-10"></div>);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const isSelected = appointmentDate === dateStr;
      const isToday = dateStr === new Date().toISOString().split('T')[0];
      const isPast = new Date(dateStr) < new Date(new Date().toISOString().split('T')[0]);
      
      days.push(
        <button
          key={i}
          onClick={() => !isPast && setAppointmentDate(dateStr)}
          disabled={isPast}
          className={`h-8 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium
            ${isSelected ? 'bg-blue-600 text-white' : ''}
            ${isToday && !isSelected ? 'border border-blue-600 text-blue-600' : ''}
            ${isPast ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-blue-100 cursor-pointer'}
            transition-colors duration-200`}
        >
          {i}
        </button>
      );
    }
    
    return days;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const navigateMonth = (direction) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-4 sm:py-6 px-3 sm:px-4 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header (unchanged) */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex justify-end mb-3 sm:mb-4">
            <motion.button
              onClick={() => navigate(-1)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border border-blue-500 text-blue-600 flex items-center"
              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              <FaArrowLeft className="mr-1 sm:mr-2" />
              Back
            </motion.button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            Book <span className="text-blue-600">Appointment</span>
          </h1>
          <motion.div
            className="w-20 sm:w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
            initial={{ width: 0 }}
            animate={{ width: "5rem sm:6rem" }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          <motion.p
            className="text-sm sm:text-base text-gray-600 mt-4 sm:mt-6 max-w-2xl mx-auto px-2 sm:px-0"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Select your preferred date and time for consultation
          </motion.p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mx-2 sm:mx-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
              {/* Doctor Info (unchanged) */}
              <motion.div className="lg:w-1/3" variants={cardVariants}>
                <div className="bg-blue-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <img
                        src={doctorData.image}
                        alt={doctorData.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/150?text=Doctor";
                        }}
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="font-bold text-sm sm:text-base text-gray-900">{doctorData.name}</h3>
                      <p className="text-xs sm:text-sm text-blue-600">{doctorData.specialty}</p>
                      <div className="flex justify-center sm:justify-start">
                        {renderRating(doctorData.rating)}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center text-xs sm:text-sm">
                      <FaClock className="text-blue-500 mr-1 sm:mr-2" />
                      <span>{doctorData.timings}</span>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm">
                      <FaCalendarAlt className="text-blue-500 mr-1 sm:mr-2" />
                      <span>{doctorData.charges} consultation fee</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Booking Form - Enhanced Section */}
              <motion.div className="lg:w-2/3" variants={cardVariants}>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                  <FaCalendarAlt className="text-blue-500 mr-1 sm:mr-2" />
                  Appointment Details
                </h3>
                
                {/* Enhanced Date Selection */}
                <form onSubmit={showAvailableSlots} className="mb-4 sm:mb-6">
                  <div className="mb-4 sm:mb-6">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                      Select Appointment Date
                    </label>
                    <div className="relative">
                      <div 
                        className={`w-full p-3 sm:p-4 border ${appointmentDate ? 'border-blue-500' : 'border-gray-300'} rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center justify-between bg-white`}
                        onClick={handleDateInputClick}
                      >
                        <span className={`${!appointmentDate ? 'text-gray-400' : 'text-gray-800'}`}>
                          {appointmentDate ? 
                            new Date(appointmentDate).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            }) : 
                            'Select a date'}
                        </span>
                        <FaCalendarAlt className="text-blue-500" />
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={!appointmentDate}
                    className={`w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl text-sm sm:text-base font-medium text-white shadow-md flex items-center justify-center gap-2 transition-all duration-300 ${
                      !appointmentDate 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg'
                    }`}
                    whileHover={appointmentDate ? { scale: 1.01 } : {}}
                    whileTap={appointmentDate ? { scale: 0.99 } : {}}
                  >
                    <FaCalendarAlt className="text-sm sm:text-base" />
                    Check Available Time Slots
                  </motion.button>
                </form>

                {/* Enhanced Time Slots Section */}
                <AnimatePresence>
                  {availableSlots.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4"
                    >
                      <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-3">Available Time Slots</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                          {availableSlots.map((slot, index) => {
                            const isBooked = bookedSlots.includes(slot); // Check if the slot is in the booked slots array
                            //alert(isBooked);
                            return (
                              <div key={index} className="col">
                                {isBooked ? (
                                  <div className="w-full h-full p-3 rounded-md bg-gradient-to-r from-red-600 to-red-900 text-white flex flex-col items-center justify-center text-center shadow">
                                    <FaClock className="mb-1 text-lg" />
                                    <span>{slot}</span>
                                  </div>
                                ) : (
                                  <button
                                    className="w-full h-full p-3 rounded-md bg-gradient-to-r from-purple-500 to-purple-800 text-white flex flex-col items-center justify-center text-center shadow hover:scale-[1.02] transition-all"
                                    onClick={() => {
                                      setSelectedSlot(slot);
                                      setShowModal(true);
                                    }}
                                  >
                                    <FaClock className="mb-1 text-lg" />
                                    <span>{slot}</span>
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Confirm Slot Modal */}
      <AnimatePresence>
        {showModal && selectedSlot && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-4 sm:p-6 shadow-lg w-full max-w-sm sm:max-w-md text-center"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaCheckCircle className="text-green-500 text-3xl sm:text-4xl mx-auto mb-2 sm:mb-3" />
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">Confirm Appointment</h2>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                Do you want to confirm your appointment on <strong>{appointmentDate}</strong> at <strong>{selectedSlot}</strong>?
              </p>
              <div className="flex justify-center gap-3 sm:gap-4">
                <button
                  onClick={confirmAppointment}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-xs sm:text-sm"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition text-xs sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Calendar Modal */}
      <AnimatePresence>
        {showCalendarModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCalendarModal(false)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-xs sm:max-w-sm w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white flex justify-between items-center">
                <h2 className="text-lg font-bold">Select Appointment Date</h2>
                <button 
                  onClick={() => setShowCalendarModal(false)}
                  className="text-white hover:text-blue-100 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-4 sm:p-5">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={() => navigateMonth(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FaChevronLeft className="text-gray-700" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <button 
                    onClick={() => navigateMonth(1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <FaChevronRight className="text-gray-700" />
                  </button>
                </div>

                {/* Day Names */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {generateDays()}
                </div>

                {/* Quick Selection */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {[0, 1, 2, 3, 4].map(days => {
                    const date = new Date();
                    date.setDate(date.getDate() + days);
                    const dateStr = date.toISOString().split('T')[0];
                    const isToday = days === 0;
                    
                    return (
                      <button
                        key={days}
                        onClick={() => setAppointmentDate(dateStr)}
                        className={`text-xs px-3 py-1.5 rounded-full border ${
                          appointmentDate === dateStr ? 
                            'bg-blue-600 text-white border-blue-600' : 
                            isToday ? 
                              'border-blue-500 text-blue-600' : 
                              'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {isToday ? 'Today' : days === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setShowCalendarModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (appointmentDate) {
                        setShowCalendarModal(false);
                      }
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
                      appointmentDate ? 
                        'bg-blue-600 hover:bg-blue-700' : 
                        'bg-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!appointmentDate}
                  >
                    Select Date
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BookAppointment;