import React, { useState, useEffect } from "react";
import { colors } from '../../Constants/Colors';
import { FiClock, FiUserPlus, FiFileText, FiBarChart2, FiUser, FiFilePlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { getSidebarNavLinks } from '../../Constants/sidebarNavConfig';
import ApiService from '../../Services/ApiService'; // Import ApiService

const StatCard = ({ icon: Icon, title, value, onClick, color }) => {
  return (
    <motion.div
      className="p-3 sm:p-4 rounded-lg shadow-md flex justify-between items-center cursor-pointer"
      style={{ backgroundColor: colors.secondary }}
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
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

const QuickActionButton = ({ icon: Icon, text, onClick, color }) => {
  return (
    <motion.button
      className="w-full p-2 sm:p-3 flex items-center gap-2 sm:gap-3 rounded-lg transition-all duration-200 text-sm sm:text-base"
      style={{
        backgroundColor: 'transparent',
        border: `1px solid ${colors.border || "#e5e7eb"}`,
        color: colors.textDark,
      }}
      onClick={onClick}
      whileHover={{ backgroundColor: `${color}15` }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className="text-lg sm:text-xl" style={{ color }} />
      <span>{text}</span>
    </motion.button>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    doctor: { name: "" },
    stats: {
      todayAppointments: 0,
      newPatients: 0,
      prescriptionsThisMonth: 0,
      adherenceRate: 0,
    },
    todayAppointmentsList: [], // Store today's appointments
    loading: true,
  });

  const sidebarNavLinks = getSidebarNavLinks("doctor");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setDashboardData((prev) => ({ ...prev, loading: true }));
        const doctorEmail = localStorage.getItem('userEmail'); // Get the logged-in doctor's email
        const today = new Date().getFullYear().toString().padStart(2, '0') + '-' +
        (new Date().getMonth() + 1).toString().padStart(2, '0') + '-' +
        new Date().getDate().toString();

        // Fetch today's appointments using the API
        const todayAppointments = await ApiService.getAppointmentsByDate(doctorEmail, today);

        const mockApiResponse = {
          doctor: { name: "Rehan", specialty: "Cardiologist" },
          stats: {
            todayAppointments: todayAppointments.length,
            newPatients: 2,
            prescriptionsThisMonth: 23,
            adherenceRate: 89,
          },
          todayAppointmentsList: todayAppointments, // Store today's appointments
        };

        setDashboardData({ ...mockApiResponse, loading: false });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setDashboardData((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchDashboardData();
  }, []);

  const getStatValue = (key) => {
    if (dashboardData.loading) {
      return <div className="h-6 sm:h-8 w-10 sm:w-12 bg-gray-200 animate-pulse rounded"></div>;
    }
    return dashboardData.stats[key];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: colors.background || "#f8f9fa" }}
      className="min-h-screen p-3 sm:p-4 md:p-6 transition-all duration-300"
    >
      {/* Header section */}
      <div className="mb-6 sm:mb-8 mt-10 md:mt-7 lg:mt-0">
        <div className="flex items-center">
          <div className="h-8 sm:h-10 w-0.5 sm:w-1 rounded-full mr-2 sm:mr-3" style={{ backgroundColor: colors.primary }}></div>
          <h1 className="text-xl sm:text-2xl font-bold" style={{ color: colors.textDark }}>
            {dashboardData.loading ? (
              <div className="h-6 sm:h-8 w-40 sm:w-48 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              `Welcome Back, Dr. ${dashboardData.doctor.name}`
            )}
          </h1>
        </div>
        <p className="ml-3 sm:ml-4 mt-1 text-xs sm:text-sm" style={{ color: colors.textLight }}>
          Here's your daily overview and quick actions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-4 sm:my-6">
        <StatCard
          icon={FiClock}
          title="Appointments"
          value={dashboardData.stats.todayAppointments}
          onClick={() =>
            navigate('/doctor/my_appointments', {
              state: { appointments: dashboardData.todayAppointmentsList }, // Pass today's appointments
            })
          }
          color={colors.primary}
        />
        <StatCard
          icon={FiUserPlus}
          title="Patients"
          value={getStatValue('newPatients')}
          onClick={() => navigate(sidebarNavLinks.find(link => link.text === "Patients").to)}
          color={colors.success}
        />
        <StatCard
          icon={FiFileText}
          title="Prescriptions"
          value={getStatValue('prescriptionsThisMonth')}
          onClick={() => navigate(sidebarNavLinks.find(link => link.text === "Prescriptions").to)}
          color={colors.primary}
        />
        <motion.div
          className="p-3 sm:p-4 rounded-lg shadow-md flex justify-between items-center"
          style={{ backgroundColor: colors.secondary }}
        >
          <div>
            <p className="text-xs sm:text-sm" style={{ color: colors.textLight }}>Adherence Rate</p>
            <h2 className="text-xl sm:text-2xl font-bold" style={{ color: colors.textDark }}>
              {dashboardData.loading ? (
                <div className="h-6 sm:h-8 w-12 sm:w-16 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                `${dashboardData.stats.adherenceRate}%`
              )}
            </h2>
          </div>
          <div className="p-2 sm:p-3 rounded-full" style={{ backgroundColor: `${colors.success}15` }}>
            <FiBarChart2 className="text-xl sm:text-2xl" style={{ color: colors.success }} />
          </div>
        </motion.div>
      </div>

      {/* Quick Actions and Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="p-4 sm:p-5 rounded-lg shadow-md" style={{ backgroundColor: colors.secondary }}>
          <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4" style={{ color: colors.textDark }}>Quick Actions</h3>
          <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3">
            <QuickActionButton
              icon={FiFilePlus}
              text="New Prescription"
              onClick={() => navigate(sidebarNavLinks.find(link => link.text === "Create Prescription").to)}
              color={colors.primary}
            />
            <QuickActionButton
              icon={FiUser}
              text="My Profile"
              onClick={() => navigate(sidebarNavLinks.find(link => link.text === "My Profile").to)}
              color={colors.primary}
            />
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-lg shadow-md" style={{ backgroundColor: colors.secondary }}>
          <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 flex items-center" style={{ color: colors.textDark }}>
            <span className="w-1 sm:w-1.5 h-4 sm:h-5 rounded-sm mr-2" style={{ backgroundColor: colors.primary }}></span>
            Instructions
          </h3>
          <ul className="mt-2 sm:mt-3 space-y-3 sm:space-y-4" style={{ color: colors.textLight }}>
            <li className="flex items-start p-2 rounded-md border-l-2" style={{ borderColor: colors.primary }}>
              <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>1</span>
              <div>
                <p className="text-sm sm:text-base"><strong style={{ color: colors.textDark }}>Create Prescription</strong></p>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed">Generate digital prescriptions with QR codes for easy patient access</p>
              </div>
            </li>
            <li className="flex items-start p-2 rounded-md border-l-2" style={{ borderColor: colors.primary }}>
              <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>2</span>
              <div>
                <p className="text-sm sm:text-base"><strong style={{ color: colors.textDark }}>Manage Prescriptions</strong></p>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed">View, search and track all prescriptions by patient name or date</p>
              </div>
            </li>
            <li className="flex items-start p-2 rounded-md border-l-2" style={{ borderColor: colors.primary }}>
              <span className="inline-block w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>3</span>
              <div>
                <p className="text-sm sm:text-base"><strong style={{ color: colors.textDark }}>Patient History</strong></p>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed">Access complete records of all patients you've treated</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Loading overlay */}
      <AnimatePresence>
        {dashboardData.loading && (
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
                <motion.div
                  className="w-2 sm:w-3 h-2 sm:h-3 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2 }}
                />
                <motion.div
                  className="w-2 sm:w-3 h-2 sm:h-3 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.4 }}
                />
                <motion.div
                  className="w-2 sm:w-3 h-2 sm:h-3 rounded-full"
                  style={{ backgroundColor: colors.primary }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.6 }}
                />
              </div>
              <p className="text-center mt-2 sm:mt-3 text-xs sm:text-sm" style={{ color: colors.textLight }}>Loading your dashboard...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;