import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { colors } from "../Constants/Colors";
import { FaUserMd, FaSignOutAlt, FaTimes, FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import { getSidebarNavLinks } from "../Constants/sidebarNavConfig";
import LogoutModal from "./LogoutModal";

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

  const handleLogout = () => {
    // Remove userRole and jwtToken from localStorage
    localStorage.removeItem('userRole');
    localStorage.removeItem('jwtToken');
    console.log("User logged out");
    setIsLogoutModalOpen(false);
    window.location.href = '/'; // Redirect to home page after logout
  };

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
        <nav className="mt-4 h-[calc(100vh-160px)] overflow-y-auto">
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

        {/* Logout Button */}
        <div className="p-4 border-t">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-all"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </motion.div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
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