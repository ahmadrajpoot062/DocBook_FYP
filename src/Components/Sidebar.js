import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { colors } from "../Constants/Colors";
import { FaUserMd, FaSignOutAlt, FaTimes, FaCheck } from "react-icons/fa"; // Import icons from react-icons
import { motion, AnimatePresence } from "framer-motion"; // Import for animations

// Import sidebar navigation configs
import { sidebarNavLinks as doctorNavLinks } from "../Constants/Doctor/sidebarNavConfig";
import { sidebarNavLinks as patientNavLinks } from "../Constants/Patient/sidebarNavConfig";

const Sidebar = ({ userType }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Determine which navigation links to use based on userType
  const sidebarNavLinks = userType === "doctor" ? doctorNavLinks : patientNavLinks;

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    // Perform logout logic here
    console.log("User logged out");
    setIsLogoutModalOpen(false);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div
      className="fixed top-0 left-0 h-screen shadow-xl z-40 w-64"
      style={{
        backgroundColor: colors.secondary,
        boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Sidebar Header */}
      <div
        className="flex items-center justify-between p-4 border-b"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, #0066cc)`,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <NavLink
          to="/"
          className="text-xl font-bold flex items-center gap-2"
          style={{ color: colors.white }}
        >
          {/* Use React Icon (FaUserMd) as the DocBook logo */}
          <FaUserMd className="text-2xl" />
          <div className="flex flex-col">
            <span>DocBook</span>
            {/* Subtext: "The Medical Assistant" */}
            <span className="text-xs font-normal" style={{ color: colors.white }}>
              The Medical Assistant
            </span>
          </div>
        </NavLink>
      </div>

      {/* Sidebar Navigation Links */}
      <nav className="mt-4">
        {sidebarNavLinks.map((link, index) => (
          <NavItem
            key={index}
            to={link.to}
            icon={link.icon}
            text={link.text}
            isLogout={link.isLogout} // Pass isLogout prop for red color
            onClick={link.isLogout ? handleLogoutClick : undefined} // Handle logout click
          />
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div
        className="absolute bottom-0 left-0 w-full p-4 border-t"
        style={{
          backgroundColor: colors.secondary,
          boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Professional Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, #0066cc)`,
                color: colors.white,
                fontSize: "14px",
                fontWeight: "bold",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {userType === "doctor" ? "DR" : "PT"}
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: colors.black }}>
                {userType === "doctor" ? "Dr. Rehan" : "Patient Name"}
              </p>
              <p className="text-xs" style={{ color: colors.black }}>
                User
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm" style={{ color: colors.black }}>
              28°C
            </p>
            <p className="text-xs" style={{ color: colors.black }}>
              Sunny
            </p>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-lg shadow-xl max-w-md w-full relative overflow-hidden"
              style={{ backgroundColor: colors.white }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Modal Header */}
              <div
                className="p-4 relative"
                style={{ backgroundColor: colors.primary }}
              >
                <h2
                  className="text-xl font-bold text-center"
                  style={{ color: colors.white }}
                >
                  Confirm Logout
                </h2>
                <motion.button
                  className="absolute right-4 top-4 text-lg"
                  style={{ color: colors.white }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLogoutCancel}
                >
                  <FaTimes />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${colors.orange}15` }}
                  >
                    <FaSignOutAlt
                      className="text-2xl"
                      style={{ color: colors.orange }}
                    />
                  </div>
                  <p
                    className="text-center mb-6"
                    style={{ color: colors.black }}
                  >
                    Are you sure you want to logout?
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-4">
                  <motion.button
                    className="px-5 py-2 rounded-lg text-sm font-medium flex items-center"
                    style={{
                      backgroundColor: colors.orange,
                      color: colors.white,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogoutConfirm}
                  >
                    <FaCheck className="mr-2" />
                    Yes, Logout
                  </motion.button>
                  <motion.button
                    className="px-5 py-2 rounded-lg text-sm font-medium flex items-center"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.white,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogoutCancel}
                  >
                    <FaTimes className="mr-2" />
                    Cancel
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

// Reusable Navigation Link Component
const NavItem = ({ to, icon, text, isLogout, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all relative ${
          isActive ? "font-bold" : "hover:bg-gray-100"
        }`
      }
      style={({ isActive }) => ({
        color: isLogout ? "#ff0000" : isHovered || isActive ? colors.primary : colors.black,
        backgroundColor: isActive ? colors.white : "transparent",
        transition: "color 0.3s ease, background-color 0.3s ease",
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick} // Handle click for logout
    >
      {/* Active Link Dot */}
      {({ isActive }) => (
        <>
          {isActive && (
            <div
              className="absolute left-0 w-1 h-6 rounded-r-full"
              style={{ backgroundColor: colors.primary }}
            ></div>
          )}
          <span>{icon}</span>
          <span>{text}</span>
        </>
      )}
    </NavLink>
  );
};

export default Sidebar;