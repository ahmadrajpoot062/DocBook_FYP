import { Home, FileText, Bell, LogOut, Scan } from "lucide-react";

export const sidebarNavLinks = [
  { to: "/", icon: <Home size={18} />, text: "Dashboard" },
  { to: "/scan_prescription", icon: <Scan size={18} />, text: "Scan Prescription" },
  { to: "/view_prescriptions", icon: <FileText size={18} />, text: "View Prescriptions" },
  { to: "/Reminders", icon: <Bell size={18} />, text: "Reminders" },
  { to: "/logout", icon: <LogOut size={18} />, text: "Logout", isLogout: true },
];