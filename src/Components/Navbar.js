import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { FaUserMd } from "react-icons/fa"; // Import the doctor icon
import { colors } from "../Constants/Colors";
import { navLinks } from "../Constants/navbarNavConfig"; // Import the navigation config
import { motion } from "framer-motion"; // For animations
import LogoutModal from "./LogoutModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const userType = localStorage.getItem("userRole")?.toLowerCase(); // Get user type from local storage
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <div className="Navbar">
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left Section: Logo and Navigation Links */}
            <div className="flex items-center flex-grow">
              <div className="flex-shrink-0">
                <NavLink
                  to="/"
                  className="text-2xl max-[442px]:text-lg max-[383px]:text-sm font-bold flex items-center gap-2"
                  style={{ color: colors.primary }}
                >
                  {/* Add the doctor icon before DocBook text */}
                  <FaUserMd className="text-2xl" />
                  <span>DocBook</span>
                </NavLink>
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex gap-x-4 ml-6">
                {navLinks.map((link, index) => (
                  <NavItem key={index} to={link.to} icon={link.icon} text={link.text} />
                ))}
              </div>
            </div>

            {/* Login Button - Always Visible */}
            {userType ? (
              <div className="flex items-center gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                style={{ backgroundColor: colors.red, color: colors.white }}
                className="px-4 py-2 rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center gap-2 transition-all"
                aria-label="Login"
              >
                <IoMdLogOut size={18} />
                Logout
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                style={{ color: colors.primary }}
                className="lg:hidden hover:text-purple-800 transition-all"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
            ) : (<div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/login")}
                style={{ backgroundColor: colors.primary, color: colors.white }}
                className="px-4 py-2 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 transition-all"
                aria-label="Login"
              >
                <IoMdLogIn size={18} />
                Login
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                style={{ color: colors.primary }}
                className="lg:hidden hover:text-purple-800 transition-all"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>)}

          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white shadow-lg transition-all duration-300 ease-in-out">
            <div className="px-4 pt-2 pb-3 space-y-2">
              {navLinks.map((link, index) => (
                <NavItem key={index} to={link.to} icon={link.icon} text={link.text} />
              ))}
            </div>
          </div>
        )}
      </nav>
      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

// Reusable Navigation Link Component
const NavItem = ({ to, icon, text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all 
        ${isActive ? "font-bold border-b-2" : ""}`
      }
      style={({ isActive }) => ({
        color: isHovered || isActive ? colors.primary : "gray",
        borderBottom: isActive ? `2px solid ${colors.primary}` : "none",
        transition: "color 0.3s ease",
      })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
      {text}
    </NavLink>
  );
};

export default Navbar;