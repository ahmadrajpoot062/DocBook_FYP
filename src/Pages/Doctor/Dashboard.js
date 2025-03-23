import React, { useState, useEffect } from "react";
import { colors } from '../../Constants/Colors';
import { FiClock, FiUserPlus, FiFileText, FiBarChart2, FiUser, FiFilePlus, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { sidebarNavLinks } from '../../Constants/Doctor/sidebarNavConfig';

// Reusable StatCard Component
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

// Reusable QuickActionButton Component
const QuickActionButton = ({ icon: Icon, text, onClick, color }) => {
  return (
    <motion.button
      className="w-full p-3 flex items-center gap-3 rounded-lg transition-all duration-200"
      style={{
        backgroundColor: 'transparent',
        border: `1px solid ${colors.border || "#e5e7eb"}`,
        color: colors.textDark,
      }}
      onClick={onClick}
      whileHover={{ backgroundColor: `${color}15` }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className="text-xl" style={{ color }} />
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
    loading: true,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setTimeout(() => {
          const mockApiResponse = {
            doctor: { name: "Rehan", specialty: "Cardiologist" },
            stats: {
              todayAppointments: 5,
              newPatients: 2,
              prescriptionsThisMonth: 23,
              adherenceRate: 89,
            },
          };
          setDashboardData({ ...mockApiResponse, loading: false });
        }, 1000);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setDashboardData((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchDashboardData();
  }, []);

  const getStatValue = (key) => {
    if (dashboardData.loading) {
      return <div className="h-8 w-12 bg-gray-200 animate-pulse rounded"></div>;
    }
    return dashboardData.stats[key];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: colors.background || "#f8f9fa" }}
      className="min-h-screen p-4 sm:p-6 transition-all duration-300 relative overflow-hidden"
    >
      {/* Header section */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className="h-10 w-1 rounded-full mr-3" style={{ backgroundColor: colors.primary }}></div>
          <h1 className="text-2xl font-bold" style={{ color: colors.textDark }}>
            {dashboardData.loading ? (
              <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              `Welcome Back, Dr. ${dashboardData.doctor.name}`
            )}
          </h1>
        </div>
        <p className="ml-4 mt-1" style={{ color: colors.textLight }}>
          Here's your daily overview and quick actions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <StatCard
          icon={FiClock}
          title="My Appointments"
          value={getStatValue('todayAppointments')}
          onClick={() => navigate(sidebarNavLinks.find(link => link.text === "Appointments").to)}
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
          className="p-4 rounded-lg shadow-md flex justify-between items-center"
          style={{ backgroundColor: colors.secondary }}
        >
          <div>
            <p style={{ color: colors.textLight }}>Adherence Rate</p>
            <h2 className="text-2xl font-bold" style={{ color: colors.textDark }}>
              {dashboardData.loading ? (
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                `${dashboardData.stats.adherenceRate}%`
              )}
            </h2>
          </div>
          <div className="p-3 rounded-full" style={{ backgroundColor: `${colors.success}15` }}>
            <FiBarChart2 className="text-2xl" style={{ color: colors.success }} />
          </div>
        </motion.div>
      </div>

      {/* Quick Actions and Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-lg shadow-md" style={{ backgroundColor: colors.secondary }}>
          <h3 className="font-bold text-lg mb-4" style={{ color: colors.textDark }}>Quick Actions</h3>
          <div className="mt-3 space-y-3">
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

        <div className="p-5 rounded-lg shadow-md" style={{ backgroundColor: colors.secondary }}>
          <h3 className="font-bold text-lg mb-4 flex items-center" style={{ color: colors.textDark }}>
            <span className="w-1.5 h-5 rounded-sm mr-2" style={{ backgroundColor: colors.primary }}></span>
            Instructions
          </h3>
          <ul className="mt-3 space-y-4" style={{ color: colors.textLight }}>
            <li className="flex items-start p-2 rounded-md border-l-2" style={{ borderColor: colors.primary }}>
              <span className="inline-block w-6 h-6 mr-3 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>1</span>
              <div>
                <p><strong style={{ color: colors.textDark }}>Create Prescription</strong></p>
                <p className="text-sm mt-1 leading-relaxed">Generate digital prescriptions with QR codes for easy patient access</p>
              </div>
            </li>
            <li className="flex items-start p-2 rounded-md border-l-2" style={{ borderColor: colors.primary }}>
              <span className="inline-block w-6 h-6 mr-3 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>2</span>
              <div>
                <p><strong style={{ color: colors.textDark }}>Manage Prescriptions</strong></p>
                <p className="text-sm mt-1 leading-relaxed">View, search and track all prescriptions by patient name or date</p>
              </div>
            </li>
            <li className="flex items-start p-2 rounded-md border-l-2" style={{ borderColor: colors.primary }}>
              <span className="inline-block w-6 h-6 mr-3 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium"
                  style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>3</span>
              <div>
                <p><strong style={{ color: colors.textDark }}>Patient History</strong></p>
                <p className="text-sm mt-1 leading-relaxed">Access complete records of all patients you've treated</p>
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
};

export default Dashboard;