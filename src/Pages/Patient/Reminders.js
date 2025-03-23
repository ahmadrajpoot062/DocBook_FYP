import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../../Constants/Colors";
import { useState, useEffect } from "react";
import { Bell, ChevronDown, Clock, CheckCircle, AlertCircle, Trash2, X } from "lucide-react";

// Initial reminders data
const initialReminders = [
  {
    id: 1,
    medicine: "paracetamol 2-tablets",
    schedule: "twice a day",
    time: "10:44 PM",
    status: "Taken",
  },
  {
    id: 2,
    medicine: "panadol 1-tablet",
    schedule: "night",
    time: "10:44 PM",
    status: "Taken",
  },
  {
    id: 3,
    medicine: "paracetamol 2-tablets",
    schedule: "twice a day",
    time: "10:39 PM",
    status: "Taken",
  },
  {
    id: 4,
    medicine: "brufen 1-tablet",
    schedule: "morning",
    time: "08:00 AM",
    status: "Pending",
  },
  {
    id: 5,
    medicine: "amoxicillin",
    schedule: "three times a day",
    time: "02:00 PM",
    status: "Pending",
  },
  {
    id: 6,
    medicine: "vitamin C",
    schedule: "once a day",
    time: "09:00 AM",
    status: "Missed",
  },
];

function Reminders() {
  const [filter, setFilter] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [reminders, setReminders] = useState(initialReminders);
  const [filteredReminders, setFilteredReminders] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Count pending and missed reminders for notification dot
  const pendingCount = reminders.filter(
    (reminder) => reminder.status === "Pending"
  ).length;
  const missedCount = reminders.filter(
    (reminder) => reminder.status === "Missed"
  ).length;
  const totalNotifications = pendingCount + missedCount;

  // Apply filtering when filter state or reminders change
  useEffect(() => {
    if (filter === "All") {
      setFilteredReminders(reminders);
    } else {
      setFilteredReminders(
        reminders.filter((reminder) => reminder.status === filter)
      );
    }
  }, [filter, reminders]);

  // Function to mark a reminder as taken
  const markAsTaken = (id) => {
    setReminders((prevReminders) =>
      prevReminders.map((reminder) =>
        reminder.id === id ? { ...reminder, status: "Taken" } : reminder
      )
    );
  };

  // Function to delete a reminder
  const deleteReminder = (id) => {
    setReminders((prevReminders) =>
      prevReminders.filter((reminder) => reminder.id !== id)
    );
  };

  // Function to check for missed reminders
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setReminders((prevReminders) =>
        prevReminders.map((reminder) => {
          const reminderTime = new Date(`01/01/2000 ${reminder.time}`);
          if (
            reminder.status === "Pending" &&
            now.getHours() > reminderTime.getHours() &&
            now.getMinutes() > reminderTime.getMinutes()
          ) {
            return { ...reminder, status: "Missed" };
          }
          return reminder;
        })
      );
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center p-4 sm:p-6"
      style={{ backgroundColor: colors.background }} // Changed background color here
    >
      {/* Header Section */}
      <motion.div
        className="w-full max-w-3xl mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-4">
          <h1
            className="text-2xl sm:text-3xl font-bold mb-2"
            style={{ color: colors.primary }}
          >
            Medicine Reminders
          </h1>
          <div
            className="w-24 h-1 mx-auto mb-3"
            style={{ backgroundColor: colors.primary }}
          ></div>
          <p style={{ color: colors.textLight }}>
            Track and manage your medication schedule
          </p>
        </div>
      </motion.div>

      {/* Filter and Notification Section */}
      <motion.div
        className="w-full max-w-3xl flex justify-between items-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center space-x-1">
          <p className="text-sm" style={{ color: colors.textLight }}>
            Total reminders: <span className="font-medium">{reminders.length}</span>
            {pendingCount > 0 && (
              <span style={{ color: "#f59e0b" }}> ({pendingCount} pending)</span>
            )}
            {missedCount > 0 && (
              <span style={{ color: "#ef4444" }}> ({missedCount} missed)</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <motion.div
            className="relative cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell style={{ color: colors.primary }} className="w-5 h-5" />
            {totalNotifications > 0 && (
              <motion.span
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                style={{ backgroundColor: colors.primary }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              ></motion.span>
            )}
          </motion.div>

          {/* Filter Dropdown */}
          <div className="relative">
            <motion.button
              className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-sm"
              style={{
                backgroundColor: colors.secondary,
                color: colors.textDark,
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              whileHover={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2"
                  style={{
                    backgroundColor:
                      filter === "All"
                        ? colors.primary
                        : filter === "Taken"
                        ? "#10b981"
                        : filter === "Pending"
                        ? "#f59e0b"
                        : "#ef4444",
                  }}
                ></span>
                {filter}
              </div>
              <ChevronDown
                className="w-4 h-4 transition-transform duration-300"
                style={{
                  transform: showFilterDropdown ? "rotate(180deg)" : "rotate(0)",
                  color: colors.primary,
                }}
              />
            </motion.button>

            {/* Filter Dropdown Options */}
            <AnimatePresence>
              {showFilterDropdown && (
                <motion.div
                  className="absolute right-0 mt-1 py-1 w-36 rounded-lg z-10 shadow-lg"
                  style={{ backgroundColor: colors.secondary }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {["All", "Taken", "Pending", "Missed"].map((option) => (
                    <motion.div
                      key={option}
                      className="px-3 py-2 text-sm cursor-pointer flex items-center"
                      style={{
                        backgroundColor:
                          filter === option ? `${colors.primary}15` : "transparent",
                        color: colors.textDark,
                      }}
                      whileHover={{ backgroundColor: `${colors.primary}25` }}
                      onClick={() => {
                        setFilter(option);
                        setShowFilterDropdown(false);
                      }}
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-full mr-2"
                        style={{
                          backgroundColor:
                            option === "All"
                              ? colors.primary
                              : option === "Taken"
                              ? "#10b981"
                              : option === "Pending"
                              ? "#f59e0b"
                              : "#ef4444",
                        }}
                      ></span>
                      {option}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Notification Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            className="fixed top-0 right-0 w-full max-w-sm h-screen bg-white shadow-lg z-50 p-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: colors.primary }}>
                Notifications
              </h2>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} style={{ color: colors.primary }} />
              </button>
            </div>
            <div className="space-y-3">
              {reminders
                .filter((reminder) => reminder.status === "Pending" || reminder.status === "Missed")
                .map((reminder) => (
                  <motion.div
                    key={reminder.id}
                    className="p-4 rounded-lg shadow-sm"
                    style={{ backgroundColor: colors.secondary }}
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor:
                            reminder.status === "Pending"
                              ? "rgba(245, 158, 11, 0.1)"
                              : "rgba(239, 68, 68, 0.1)",
                          color:
                            reminder.status === "Pending" ? "#f59e0b" : "#ef4444",
                        }}
                      >
                        {reminder.status === "Pending" ? (
                          <Clock size={16} />
                        ) : (
                          <AlertCircle size={16} />
                        )}
                      </div>
                      <div>
                        <h2
                          className="text-base font-medium"
                          style={{ color: colors.textDark }}
                        >
                          {reminder.medicine}
                        </h2>
                        <p
                          className="text-sm"
                          style={{ color: colors.textLight }}
                        >
                          {reminder.schedule}
                        </p>
                        <div
                          className="flex items-center mt-1 text-xs"
                          style={{ color: colors.textLight }}
                        >
                          <Clock size={12} className="mr-1" />
                          {reminder.time}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reminder Cards */}
      <motion.div
        className="w-full max-w-3xl space-y-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredReminders.length === 0 ? (
          <motion.div
            className="text-center py-8 rounded-lg"
            style={{ backgroundColor: colors.secondary }}
            variants={itemVariants}
          >
            <AlertCircle
              className="mx-auto mb-2"
              style={{ color: colors.primary }}
            />
            <p style={{ color: colors.textLight }}>
              No {filter.toLowerCase()} reminders found
            </p>
          </motion.div>
        ) : (
          filteredReminders.map((reminder) => (
            <motion.div
              key={reminder.id}
              variants={itemVariants}
              className="flex items-center justify-between p-4 rounded-lg shadow-sm"
              style={{
                backgroundColor: colors.secondary,
                borderLeft: `4px solid ${colors.primary}`,
              }}
              whileHover={{
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor:
                      reminder.status === "Taken"
                        ? "rgba(16, 185, 129, 0.1)"
                        : reminder.status === "Pending"
                        ? "rgba(245, 158, 11, 0.1)"
                        : "rgba(239, 68, 68, 0.1)",
                    color:
                      reminder.status === "Taken"
                        ? "#10b981"
                        : reminder.status === "Pending"
                        ? "#f59e0b"
                        : "#ef4444",
                  }}
                >
                  {reminder.status === "Taken" ? (
                    <CheckCircle size={16} />
                  ) : reminder.status === "Pending" ? (
                    <Clock size={16} />
                  ) : (
                    <AlertCircle size={16} />
                  )}
                </div>
                <div>
                  <h2
                    className="text-base font-medium"
                    style={{ color: colors.textDark }}
                  >
                    {reminder.medicine}
                  </h2>
                  <p
                    className="text-sm"
                    style={{ color: colors.textLight }}
                  >
                    {reminder.schedule}
                  </p>
                  <div
                    className="flex items-center mt-1 text-xs"
                    style={{ color: colors.textLight }}
                  >
                    <Clock size={12} className="mr-1" />
                    {reminder.time}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {reminder.status === "Pending" ? (
                  <motion.button
                    className="text-xs font-medium px-3 py-1 rounded-full inline-flex items-center gap-1"
                    style={{
                      backgroundColor: "rgba(245, 158, 11, 0.1)",
                      color: "#f59e0b",
                      border: "none",
                      cursor: "pointer",
                    }}
                    whileHover={{
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      color: "#10b981",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => markAsTaken(reminder.id)}
                  >
                    <Clock size={12} />
                    Mark as Taken
                  </motion.button>
                ) : reminder.status === "Missed" ? (
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full inline-flex items-center gap-1"
                    style={{
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      color: "#ef4444",
                    }}
                  >
                    <AlertCircle size={12} />
                    Missed
                  </span>
                ) : (
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full inline-flex items-center gap-1"
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      color: "#10b981",
                    }}
                  >
                    <CheckCircle size={12} />
                    Taken
                  </span>
                )}

                {/* Delete button */}
                <motion.button
                  className="p-1.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    color: "#ef4444",
                    border: "none",
                    cursor: "pointer",
                  }}
                  whileHover={{
                    backgroundColor: "rgba(239, 68, 68, 0.2)",
                    scale: 1.1,
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteReminder(reminder.id)}
                  aria-label="Delete reminder"
                >
                  <Trash2 size={14} />
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}

export default Reminders;