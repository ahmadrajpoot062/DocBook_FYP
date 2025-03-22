import { FiHome, FiFilePlus, FiFileText, FiUsers, FiUser, FiLogOut, FiCalendar } from "react-icons/fi"; // Import icons for sidebar links

export const sidebarNavLinks = [
  { to: "/", icon: <FiHome size={18} />, text: "Dashboard" },
  { to: "/create_prescription", icon: <FiFilePlus size={18} />, text: "Create Prescription" },
  { to: "/prescriptions", icon: <FiFileText size={18} />, text: "Prescriptions" },
  { to: "/patients", icon: <FiUsers size={18} />, text: "Patients" },
  { to: "/my_profile", icon: <FiUser size={18} />, text: "My Profile" },
  { to: "/my_appointments", icon: <FiCalendar size={18} />, text: "Appointments" },
  { to: "/logout", icon: <FiLogOut size={18} />, text: "Logout", isLogout: true }, // Logout link with red color
];