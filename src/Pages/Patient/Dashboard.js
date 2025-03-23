import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Calendar, FileText, Scan, Info, Clock, CheckCircle, AlertTriangle, X } from "lucide-react";
import { colors } from "../../Constants/Colors";
import { useNavigate } from 'react-router-dom';

// Reusable StatCard Component (similar to Doctor Dashboard)
const StatCard = ({ icon: Icon, title, value, onClick, color }) => {
  return (
    <motion.div
      className="p-4 rounded-lg shadow-md flex justify-between items-center cursor-pointer"
      style={{ backgroundColor: colors.secondary }}
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      onClick={onClick}
    >
      <div>
        <p style={{ color: colors.textLight }}>{title}</p>
        <h2 className="text-2xl font-bold" style={{ color: colors.textDark }}>
          {value}
        </h2>
      </div>
      <div className="p-3 rounded-full" style={{ backgroundColor: `${color}15` }}>
        <Icon className="text-2xl" style={{ color }} />
      </div>
    </motion.div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, desc, onClick, color = colors.primary }) => {
  return (
    <motion.div
      className="p-4 rounded-lg shadow-md cursor-pointer"
      style={{ backgroundColor: colors.secondary }}
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className="p-3 rounded-full mb-3" style={{ backgroundColor: `${color}15` }}>
          <Icon size={24} style={{ color: color }} />
        </div>
        <h3 className="font-bold" style={{ color: colors.textDark }}>{title}</h3>
        <p className="text-sm mt-1" style={{ color: colors.textLight }}>{desc}</p>
      </div>
    </motion.div>
  );
};

function Dashboard({ name = "Patient" }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false); // State for showing notifications
  const [reminders, setReminders] = useState([
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
  ]);

  // Count pending and missed reminders for notification dot
  const pendingCount = reminders.filter(
    (reminder) => reminder.status === "Pending"
  ).length;
  const missedCount = reminders.filter(
    (reminder) => reminder.status === "Missed"
  ).length;
  const totalNotifications = pendingCount + missedCount;

  useEffect(() => {
    // Simulate loading for consistency with Doctor Dashboard
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: colors.background || "#f8f9fa" }}
      className="min-h-screen p-4 sm:p-6 transition-all duration-300 relative overflow-hidden"
    >
      {/* Header section - styled like Doctor Dashboard */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className="h-10 w-1 rounded-full mr-3" style={{ backgroundColor: colors.primary }}></div>
          <h1 className="text-2xl font-bold" style={{ color: colors.textDark }}>
            {loading ? (
              <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              `Welcome Back, ${name}`
            )}
          </h1>
        </div>
        <p className="ml-4 mt-1" style={{ color: colors.textLight }}>
          Manage your health and stay on top of your medical needs
        </p>
      </div>

      {/* Feature Cards - using grid layout like Doctor Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <FeatureCard 
          icon={Scan} 
          title="Scan Prescription" 
          desc="Upload or scan your prescription" 
          onClick={() => navigate("/scan_prescription")}
        />
        <FeatureCard 
          icon={FileText} 
          title="View Prescriptions" 
          desc="Access your past prescriptions" 
          onClick={() => navigate("/view_prescriptions")} 
        />
        <FeatureCard 
          icon={Bell} 
          title="Notifications" 
          desc="Check your latest updates" 
          onClick={() => setShowNotifications(true)} // Open notifications panel
        />
        <FeatureCard 
          icon={Clock} 
          title="Reminders" 
          desc="Set and manage your reminders" 
          onClick={() => navigate("/Reminders")}
        />
      </div>

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
                          <AlertTriangle size={16} />
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

      {/* Instructions and Reminders - using grid layout like Doctor Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-lg shadow-md" style={{ backgroundColor: colors.secondary }}>
          <h3 className="font-bold text-lg mb-5 flex items-center" style={{ color: colors.textDark }}>
            <span className="w-1.5 h-5 rounded-sm mr-2" style={{ backgroundColor: colors.primary }}></span>
            <Info size={18} className="mr-2" style={{ color: colors.primary }} />
            Instructions
          </h3>
          <ul className="mt-3 space-y-4" style={{ color: colors.textLight }}>
            <li className="flex items-start p-2 rounded-md border-l-2" style={{ borderColor: colors.primary }}>
              <span className="inline-block w-6 h-6 mr-3 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>1</span>
              <div>
                <p><strong style={{ color: colors.textDark }}>Scan Prescription</strong></p>
                <p className="text-sm mt-1 leading-relaxed">To get latest digital prescription from your doctor, use the Scan Prescription.</p>
              </div>
            </li>
            <li className="flex items-start p-2 rounded-md border-l-2" style={{ borderColor: colors.primary }}>
              <span className="inline-block w-6 h-6 mr-3 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>2</span>
              <div>
                <p><strong style={{ color: colors.textDark }}>View Prescriptions</strong></p>
                <p className="text-sm mt-1 leading-relaxed">Access the View Prescriptions section to review your past prescriptions.</p>
              </div>
            </li>
            <li className="flex items-start p-2 rounded-md border-l-2" style={{ borderColor: colors.primary }}>
              <span className="inline-block w-6 h-6 mr-3 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>3</span>
              <div>
                <p><strong style={{ color: colors.textDark }}>Reminders</strong></p>
                <p className="text-sm mt-1 leading-relaxed">Use Reminders feature to keep track of your medicines.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-lg shadow-md" style={{ backgroundColor: colors.secondary }}>
          <h3 className="font-bold text-lg mb-5 flex items-center" style={{ color: colors.textDark }}>
            <span className="w-1.5 h-5 rounded-sm mr-2" style={{ backgroundColor: colors.primary }}></span>
            <Clock size={18} className="mr-2" style={{ color: colors.primary }} />
            Reminders
          </h3>
          <ul className="mt-3 space-y-4" style={{ color: colors.textLight }}>
            <li className="flex items-start p-2 rounded-md border-l-2" style={{ borderColor: colors.primary }}>
              <span className="inline-block w-6 h-6 mr-3 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                <CheckCircle size={12} />
              </span>
              <div>
                <p><strong style={{ color: colors.textDark }}>Take Medication on time</strong></p>
                <p className="text-sm mt-1 leading-relaxed">as prescribed by doctor</p>
              </div>
            </li>
            <li className="flex items-start p-2 rounded-md border-l-2" style={{ borderColor: colors.primary }}>
              <span className="inline-block w-6 h-6 mr-3 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                <AlertTriangle size={12} />
              </span>
              <div>
                <p><strong style={{ color: colors.textDark }}>Follow-up Appointments</strong></p>
                <p className="text-sm mt-1 leading-relaxed">consult doctor on time</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Loading overlay - same as Doctor Dashboard */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="p-8 rounded-lg shadow-lg bg-white"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center justify-center space-x-2">
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2 }}
                />
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.4 }}
                />
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.6 }}
                />
              </div>
              <p className="text-center mt-3" style={{ color: colors.textLight }}>Loading your dashboard...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Dashboard;