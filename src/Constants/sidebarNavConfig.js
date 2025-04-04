// sidebarNavConfig.js
import { FiHome, FiFilePlus, FiFileText, FiUsers, FiUser, FiLogOut, FiCalendar } from "react-icons/fi"; // Doctor Icons
import { FaUserMd } from "react-icons/fa"; // Patient Icons
import { Home, FileText, Bell, LogOut, Scan } from "lucide-react"; // Patient Icons

export const getSidebarNavLinks = (userType) => {
  if (userType === "doctor") {
    return [
      { to: "/", icon: <FiHome size={18} />, text: "Dashboard" },
      { to: "doctor/create_prescription", icon: <FiFilePlus size={18} />, text: "Create Prescription" },
      { to: "doctor/prescriptions", icon: <FiFileText size={18} />, text: "Prescriptions" },
      { to: "doctor/patients", icon: <FiUsers size={18} />, text: "Patients" },
      { to: "doctor/my_profile", icon: <FiUser size={18} />, text: "My Profile" },
      { to: "doctor/my_appointments", icon: <FiCalendar size={18} />, text: "Appointments" },
      { to: "doctor/logout", icon: <FiLogOut size={18} />, text: "Logout", isLogout: true },
    ];
  } else if (userType === "patient") {
    return [
      { to: "/", icon: <Home size={18} />, text: "Dashboard" },
      { to: "patient/scan_prescription", icon: <Scan size={18} />, text: "Scan Prescription" },
      { to: "patient/view_prescriptions", icon: <FileText size={18} />, text: "View Prescriptions" },
      { to: "patient/doctors", icon: <FaUserMd size={18} />, text: "Doctors" },
      { to: "patient/Reminders", icon: <Bell size={18} />, text: "Reminders" },
      { to: "patient/my_appointments", icon: <FiCalendar size={18} />, text: "Appointments" },
      { to: "patient/logout", icon: <LogOut size={18} />, text: "Logout", isLogout: true },
    ];
  } else {
    return []; // Default case (optional)
  }
};