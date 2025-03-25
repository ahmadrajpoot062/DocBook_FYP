import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Calendar, FileText, Scan, Info, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { colors } from "../../Constants/Colors";
import { useNavigate } from 'react-router-dom';
import { getSidebarNavLinks } from "../../Constants/sidebarNavConfig";
import NotificationPanel from "../../Components/NotificationPanel";

// StatCard Component
const StatCard = ({ icon: Icon, title, value, onClick, color }) => {
  return (
    <motion.div
      className="p-3 sm:p-4 rounded-lg shadow-md flex justify-between items-center cursor-pointer"
      style={{ backgroundColor: colors.secondary }}
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      onClick={onClick}
    >
      <div>
        <p className="text-xs sm:text-sm" style={{ color: colors.textLight }}>{title}</p>
        <h2 className="text-xl sm:text-2xl font-bold" style={{ color: colors.textDark }}>
          {value}
        </h2>
      </div>
      <div className="p-2 sm:p-3 rounded-full" style={{ backgroundColor: `${color}15` }}>
        <Icon className="text-xl sm:text-2xl" style={{ color }} />
      </div>
    </motion.div>
  );
};

// FeatureCard Component
const FeatureCard = ({ icon: Icon, title, desc, onClick, color = colors.primary }) => {
  return (
    <motion.div
      className="p-3 sm:p-4 rounded-lg shadow-md cursor-pointer h-full"
      style={{ backgroundColor: colors.secondary }}
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center h-full">
        <div className="p-2 sm:p-3 rounded-full mb-2 sm:mb-3" style={{ backgroundColor: `${color}15` }}>
          <Icon size={20} className="sm:w-6 sm:h-6" style={{ color: color }} />
        </div>
        <h3 className="font-bold text-sm sm:text-base" style={{ color: colors.textDark }}>{title}</h3>
        <p className="text-xs sm:text-sm mt-1" style={{ color: colors.textLight }}>{desc}</p>
      </div>
    </motion.div>
  );
};

function Dashboard({ name = "Patient" }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [reminders, setReminders] = useState([
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
    }
  ]);

  const sidebarNavLinks = getSidebarNavLinks("patient");
  const pendingCount = reminders.filter(r => r.status === "Pending").length;
  const missedCount = reminders.filter(r => r.status === "Missed").length;
  const totalNotifications = pendingCount + missedCount;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const markAsTaken = (id) => {
    setReminders(prev => prev.map(r => 
      r.id === id ? { ...r, status: "Taken" } : r
    ));
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: colors.background || "#f8f9fa" }}
      className="min-h-screen p-3 sm:p-4 md:p-6 transition-all duration-300 relative overflow-hidden"
    >
      {/* Header section */}
      <div className="mb-6 sm:mb-8 mt-10 md:mt-7 lg:mt-0">
        <div className="flex items-center">
          <div className="h-8 sm:h-10 w-0.5 sm:w-1 rounded-full mr-2 sm:mr-3" style={{ backgroundColor: colors.primary }}></div>
          <h1 className="text-xl sm:text-2xl font-bold" style={{ color: colors.textDark }}>
            {loading ? (
              <div className="h-6 sm:h-8 w-40 sm:w-48 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              `Welcome Back, ${name}`
            )}
          </h1>
        </div>
        <p className="ml-3 sm:ml-4 mt-1 text-xs sm:text-sm" style={{ color: colors.textLight }}>
          Manage your health and stay on top of your medical needs
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 my-4 sm:my-6">
        <FeatureCard
          icon={Scan}
          title="Scan Prescription"
          desc="Upload or scan your prescription"
          onClick={() => navigate(sidebarNavLinks.find(link => link.text === "Scan Prescription").to)}
        />
        <FeatureCard
          icon={FileText}
          title="View Prescriptions"
          desc="Access your past prescriptions"
          onClick={() => navigate(sidebarNavLinks.find(link => link.text === "View Prescriptions").to)}
        />
        <FeatureCard
          icon={Bell}
          title="Notifications"
          desc="Check your latest updates"
          onClick={() => setShowNotifications(true)}
          color={totalNotifications > 0 ? colors.warning : colors.primary}
        />
        <FeatureCard
          icon={Clock}
          title="Reminders"
          desc="Set and manage your reminders"
          onClick={() => navigate(sidebarNavLinks.find(link => link.text === "Reminders").to)}
        />
      </div>

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={reminders.filter(r => r.status === "Pending" || r.status === "Missed")}
        onMarkAsTaken={markAsTaken}
        title="Medication Reminders"
        emptyMessage="No pending medications"
        emptyDescription="You're all caught up with your medications"
      />

      {/* Instructions and Reminders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="p-4 sm:p-5 rounded-lg shadow-md" style={{ backgroundColor: colors.secondary }}>
          <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-5 flex items-center" style={{ color: colors.textDark }}>
            <span className="w-1 sm:w-1.5 h-4 sm:h-5 rounded-sm mr-2" style={{ backgroundColor: colors.primary }}></span>
            <Info size={16} className="sm:w-5 sm:h-5 mr-2" style={{ color: colors.primary }} />
            Instructions
          </h3>
          <ul className="mt-2 sm:mt-3 space-y-3 sm:space-y-4" style={{ color: colors.textLight }}>
            {[
              {
                step: 1,
                title: "Scan Prescription",
                desc: "To get latest digital prescription from your doctor, use the Scan Prescription."
              },
              {
                step: 2,
                title: "View Prescriptions",
                desc: "Access the View Prescriptions section to review your past prescriptions."
              },
              {
                step: 3,
                title: "Reminders",
                desc: "Use Reminders feature to keep track of your medicines."
              }
            ].map((item) => (
              <li key={item.step} className="flex items-start p-2 rounded-md border-l-2" style={{ borderColor: colors.primary }}>
                <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                  {item.step}
                </span>
                <div>
                  <p className="text-sm sm:text-base"><strong style={{ color: colors.textDark }}>{item.title}</strong></p>
                  <p className="text-xs sm:text-sm mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 sm:p-5 rounded-lg shadow-md" style={{ backgroundColor: colors.secondary }}>
          <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-5 flex items-center" style={{ color: colors.textDark }}>
            <span className="w-1 sm:w-1.5 h-4 sm:h-5 rounded-sm mr-2" style={{ backgroundColor: colors.primary }}></span>
            <Clock size={16} className="sm:w-5 sm:h-5 mr-2" style={{ color: colors.primary }} />
            Reminders
          </h3>
          <ul className="mt-2 sm:mt-3 space-y-3 sm:space-y-4" style={{ color: colors.textLight }}>
            <li className="flex items-start p-2 rounded-md border-l-2" style={{ borderColor: colors.primary }}>
              <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium"
                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                <CheckCircle size={12} className="sm:w-3 sm:h-3" />
              </span>
              <div>
                <p className="text-sm sm:text-base"><strong style={{ color: colors.textDark }}>Take Medication on time</strong></p>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed">as prescribed by doctor</p>
              </div>
            </li>
            <li className="flex items-start p-2 rounded-md border-l-2" style={{ borderColor: colors.primary }}>
              <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium"
                style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                <AlertTriangle size={12} className="sm:w-3 sm:h-3" />
              </span>
              <div>
                <p className="text-sm sm:text-base"><strong style={{ color: colors.textDark }}>Follow-up Appointments</strong></p>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed">consult doctor on time</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="p-6 sm:p-8 rounded-lg shadow-lg bg-white"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 sm:w-3 h-2 sm:h-3 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              <p className="text-center mt-2 sm:mt-3 text-xs sm:text-sm" style={{ color: colors.textLight }}>Loading your dashboard...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Dashboard;