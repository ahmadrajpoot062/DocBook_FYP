import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../../Constants/Colors";
import { useState, useEffect } from "react";
import { FaBell, FaChevronDown, FaClock, FaCheckCircle, FaExclamationCircle, FaTrash } from "react-icons/fa";
import NotificationPanel from "../../Components/NotificationPanel";

const initialReminders = [
  {
    id: 1,
    medicine: "Paracetamol (2 tablets)",
    schedule: "Twice a day",
    time: "10:44 PM",
    status: "Taken",
    dosage: "500mg"
  },
  {
    id: 2,
    medicine: "Panadol (1 tablet)",
    schedule: "Night",
    time: "10:44 PM",
    status: "Taken",
    dosage: "500mg"
  },
  {
    id: 3,
    medicine: "Paracetamol (2 tablets)",
    schedule: "Twice a day",
    time: "10:39 PM",
    status: "Taken",
    dosage: "500mg"
  },
  {
    id: 4,
    medicine: "Brufen (1 tablet)",
    schedule: "Morning",
    time: "08:00 AM",
    status: "Pending",
    dosage: "400mg"
  },
  {
    id: 5,
    medicine: "Amoxicillin",
    schedule: "Three times a day",
    time: "02:00 PM",
    status: "Pending",
    dosage: "250mg"
  },
  {
    id: 6,
    medicine: "Vitamin C",
    schedule: "Once a day",
    time: "09:00 AM",
    status: "Missed",
    dosage: "1000mg"
  },
];

function Reminders() {
  const [filter, setFilter] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [reminders, setReminders] = useState(initialReminders);
  const [filteredReminders, setFilteredReminders] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const pendingCount = reminders.filter(r => r.status === "Pending").length;
  const missedCount = reminders.filter(r => r.status === "Missed").length;
  const totalNotifications = pendingCount + missedCount;

  useEffect(() => {
    if (filter === "All") {
      setFilteredReminders(reminders);
    } else {
      setFilteredReminders(reminders.filter(r => r.status === filter));
    }
  }, [filter, reminders]);

  const markAsTaken = (id) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, status: "Taken" } : r));
  };

  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setReminders(prev => prev.map(r => {
        const [hours, minutes] = r.time.split(':');
        const period = r.time.includes('PM') && hours !== '12' ? 12 : 0;
        const reminderHours = parseInt(hours) + period;
        const reminderMinutes = parseInt(minutes);
        
        if (r.status === "Pending" && 
            (now.getHours() > reminderHours || 
            (now.getHours() === reminderHours && now.getMinutes() > reminderMinutes))) {
          return { ...r, status: "Missed" };
        }
        return r;
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4 sm:py-12 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12 mt-4 sm:mt-2 lg:mt-0"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Medication <span className="text-blue-600">Reminders</span>
          </h1>
          <motion.div
            className="w-16 sm:w-24 h-1 sm:h-1.5 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          <motion.p
            className="text-base sm:text-lg text-gray-600 mt-4 sm:mt-6 max-w-2xl mx-auto px-2"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Track and manage your medication schedule
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-4 sm:p-6 mb-6 sm:mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg text-center">
              <p className="text-xs sm:text-sm text-gray-600">Total Reminders</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{reminders.length}</p>
            </div>
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg text-center">
              <p className="text-xs sm:text-sm text-gray-600">Taken</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                {reminders.filter(r => r.status === "Taken").length}
              </p>
            </div>
            <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg text-center">
              <p className="text-xs sm:text-sm text-gray-600">Pending</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <div className="bg-red-50 p-3 sm:p-4 rounded-lg text-center">
              <p className="text-xs sm:text-sm text-gray-600">Missed</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600">{missedCount}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.button
            className="relative flex items-center gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-sm border border-gray-200 text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowNotifications(true)}
          >
            <FaBell className="text-blue-600 text-sm sm:text-base" />
            <span>Notifications</span>
            {totalNotifications > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {totalNotifications}
              </span>
            )}
          </motion.button>

          <div className="relative w-full sm:w-auto">
            <motion.button
              className="flex items-center justify-between gap-2 sm:gap-3 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-sm border border-gray-200 w-full sm:w-auto text-sm sm:text-base"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      filter === "All" ? colors.primary :
                      filter === "Taken" ? "#10b981" :
                      filter === "Pending" ? "#f59e0b" : "#ef4444",
                  }}
                ></span>
                <span>{filter}</span>
              </div>
              <FaChevronDown
                className={`text-xs sm:text-sm transition-transform ${showFilterDropdown ? 'transform rotate-180' : ''}`}
              />
            </motion.button>

            <AnimatePresence>
              {showFilterDropdown && (
                <motion.div
                  className="absolute right-0 mt-1 sm:mt-2 w-full sm:w-48 bg-white rounded-lg shadow-lg z-10 overflow-hidden"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {["All", "Taken", "Pending", "Missed"].map((option) => (
                    <motion.button
                      key={option}
                      className={`w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2 text-sm sm:text-base ${filter === option ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                      onClick={() => {
                        setFilter(option);
                        setShowFilterDropdown(false);
                      }}
                      whileHover={{ backgroundColor: "#f8fafc" }}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor:
                            option === "All" ? colors.primary :
                            option === "Taken" ? "#10b981" :
                            option === "Pending" ? "#f59e0b" : "#ef4444",
                        }}
                      ></span>
                      {option}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <NotificationPanel
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
          notifications={reminders.filter(r => r.status === "Pending" || r.status === "Missed")}
          onMarkAsTaken={markAsTaken}
        />

        <motion.div
          className="space-y-3 sm:space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredReminders.length === 0 ? (
            <motion.div
              className="bg-white rounded-xl shadow-sm p-6 sm:p-8 text-center"
              variants={itemVariants}
            >
              <FaExclamationCircle className="mx-auto text-gray-400 text-3xl sm:text-4xl mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">No reminders found</h3>
              <p className="text-gray-500 text-sm sm:text-base">
                {filter === "All" 
                  ? "You don't have any reminders yet" 
                  : `No ${filter.toLowerCase()} reminders found`}
              </p>
            </motion.div>
          ) : (
            filteredReminders.map((reminder) => (
              <motion.div
                key={reminder.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
                whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className="p-2 sm:p-3 rounded-lg flex-shrink-0"
                        style={{
                          backgroundColor:
                            reminder.status === "Taken" ? "#d1fae5" :
                            reminder.status === "Pending" ? "#fef3c7" : "#fee2e2",
                          color:
                            reminder.status === "Taken" ? "#059669" :
                            reminder.status === "Pending" ? "#d97706" : "#dc2626",
                        }}
                      >
                        {reminder.status === "Taken" ? (
                          <FaCheckCircle className="text-base sm:text-xl" />
                        ) : reminder.status === "Pending" ? (
                          <FaClock className="text-base sm:text-xl" />
                        ) : (
                          <FaExclamationCircle className="text-base sm:text-xl" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm sm:text-base">{reminder.medicine}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">{reminder.dosage} • {reminder.schedule}</p>
                        <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                          <FaClock className="mr-1 sm:mr-2" />
                          {reminder.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end sm:justify-start gap-2 sm:gap-2">
                      {reminder.status === "Pending" && (
                        <motion.button
                          className="text-xs font-medium px-2 sm:px-3 py-1 rounded-full flex items-center gap-1"
                          style={{
                            backgroundColor: "#d1fae5",
                            color: "#059669",
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => markAsTaken(reminder.id)}
                        >
                          <FaCheckCircle className="text-xs" />
                          <span className="hidden xs:inline">Mark Taken</span>
                        </motion.button>
                      )}
                      <motion.button
                        className="p-1 sm:p-2 rounded-full hover:bg-gray-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteReminder(reminder.id)}
                      >
                        <FaTrash className="text-gray-500 hover:text-red-500 text-sm sm:text-base" />
                      </motion.button>
                    </div>
                  </div>
                </div>
                {reminder.status === "Missed" && (
                  <div className="bg-red-50 px-4 sm:px-6 py-2 sm:py-3 border-t border-red-100">
                    <div className="flex items-center gap-2 text-red-600 text-xs sm:text-sm">
                      <FaExclamationCircle />
                      <span className="font-medium">This dose was missed</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Reminders;