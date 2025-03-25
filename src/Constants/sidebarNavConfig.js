// sidebarNavConfig.js
import { FiHome, FiFilePlus, FiFileText, FiUsers, FiUser, FiLogOut, FiCalendar } from "react-icons/fi"; // Doctor Icons
import { Home, FileText, Bell, LogOut, Scan } from "lucide-react"; // Patient Icons

export const getSidebarNavLinks = (userType) => {
  if (userType === "doctor") {
    return [
      { to: "/", icon: <FiHome size={18} />, text: "Dashboard" },
      { to: "/create_prescription", icon: <FiFilePlus size={18} />, text: "Create Prescription" },
      { to: "/prescriptions", icon: <FiFileText size={18} />, text: "Prescriptions" },
      { to: "/patients", icon: <FiUsers size={18} />, text: "Patients" },
      { to: "/my_profile", icon: <FiUser size={18} />, text: "My Profile" },
      { to: "/my_appointments", icon: <FiCalendar size={18} />, text: "Appointments" },
      { to: "/logout", icon: <FiLogOut size={18} />, text: "Logout", isLogout: true },
    ];
  } else if (userType === "patient") {
    return [
      { to: "/", icon: <Home size={18} />, text: "Dashboard" },
      { to: "/scan_prescription", icon: <Scan size={18} />, text: "Scan Prescription" },
      { to: "/view_prescriptions", icon: <FileText size={18} />, text: "View Prescriptions" },
      { to: "/Reminders", icon: <Bell size={18} />, text: "Reminders" },
      { to: "/logout", icon: <LogOut size={18} />, text: "Logout", isLogout: true },
    ];
  } else {
    return []; // Default case (optional)
  }
};