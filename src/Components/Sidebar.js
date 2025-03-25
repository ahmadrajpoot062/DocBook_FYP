import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { colors } from "../Constants/Colors";
import { FaUserMd, FaSignOutAlt, FaTimes, FaCheck, FaBars } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { getSidebarNavLinks } from "../Constants/sidebarNavConfig";

const Sidebar = ({ userType }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const isLargeScreen = window.innerWidth >= 1024;
      setIsSidebarOpen(isLargeScreen);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => window.innerWidth < 1024 && setIsSidebarOpen(false);

  const sidebarNavLinks = getSidebarNavLinks(userType);

  return (
    <>
      {/* Mobile Toggle Button */}
      {!isSidebarOpen && (
        <button
          className="fixed top-4 left-4 z-40 p-2 bg-white rounded-lg shadow-md lg:hidden"
          onClick={toggleSidebar}
          aria-label="Open menu"
        >
          <FaBars className="text-xl" />
        </button>
      )}

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className="fixed top-0 left-0 h-screen shadow-xl z-40 w-64"
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : -260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          backgroundColor: colors.secondary,
          boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, #0066cc)`,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}>
          <NavLink to="/" className="text-xl font-bold flex items-center gap-2" style={{ color: colors.white }}>
            <FaUserMd className="text-2xl" />
            <div className="flex flex-col">
              <span>DocBook</span>
              <span className="text-xs font-normal">The Medical Assistant</span>
            </div>
          </NavLink>
          
          <button 
            className="lg:hidden text-white" 
            onClick={toggleSidebar}
            aria-label="Close menu"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 h-[calc(100vh-120px)] overflow-y-auto">
          {sidebarNavLinks.map((link) => (
            <NavItem
              key={link.to}
              to={link.to}
              icon={link.icon}
              text={link.text}
              isLogout={link.isLogout}
              onClick={link.isLogout ? () => setIsLogoutModalOpen(true) : undefined}
              closeSidebar={closeSidebar}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t"
          style={{
            backgroundColor: colors.secondary,
            boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1)",
          }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, #0066cc)`,
                  color: colors.white,
                  fontSize: "14px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}>
                {userType === "doctor" ? "DR" : "PT"}
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: colors.black }}>
                  {userType === "doctor" ? "Dr. Rehan" : "Patient Name"}
                </p>
                <p className="text-xs" style={{ color: colors.black }}>User</p>
              </div>
            </div>
            <div>
              <p className="text-sm" style={{ color: colors.black }}>28°C</p>
              <p className="text-xs" style={{ color: colors.black }}>Sunny</p>
            </div>
          </div>
        </div>
      </motion.div>

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
              <div className="p-4 relative"
                style={{ backgroundColor: colors.primary }}>
                <h2 className="text-xl font-bold text-center" style={{ color: colors.white }}>
                  Confirm Logout
                </h2>
                <motion.button
                  className="absolute right-4 top-4 text-lg"
                  style={{ color: colors.white }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLogoutModalOpen(false)}
                >
                  <FaTimes />
                </motion.button>
              </div>

              <div className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${colors.orange}15` }}>
                    <FaSignOutAlt className="text-2xl" style={{ color: colors.orange }} />
                  </div>
                  <p className="text-center mb-6" style={{ color: colors.black }}>
                    Are you sure you want to logout?
                  </p>
                </div>

                <div className="flex justify-center gap-4">
                  <motion.button
                    className="px-5 py-2 rounded-lg text-sm font-medium flex items-center"
                    style={{ backgroundColor: colors.orange, color: colors.white }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      console.log("User logged out");
                      setIsLogoutModalOpen(false);
                    }}
                  >
                    <FaCheck className="mr-2" /> Yes, Logout
                  </motion.button>
                  <motion.button
                    className="px-5 py-2 rounded-lg text-sm font-medium flex items-center"
                    style={{ backgroundColor: colors.primary, color: colors.white }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsLogoutModalOpen(false)}
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const NavItem = ({ to, icon, text, isLogout, onClick, closeSidebar }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all relative ${
          isActive ? "font-bold bg-white" : "hover:bg-gray-100"
        }`
      }
      style={({ isActive }) => ({
        color: isLogout ? "#ff0000" : isActive ? colors.primary : colors.black,
        transition: "color 0.3s ease, background-color 0.3s ease",
      })}
      onClick={(e) => {
        if (onClick) onClick(e);
        if (closeSidebar) closeSidebar();
      }}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-0 w-1 h-6 rounded-r-full"
              style={{ backgroundColor: colors.primary }} />
          )}
          <span>{icon}</span>
          <span>{text}</span>
        </>
      )}
    </NavLink>
  );
};

export default Sidebar;