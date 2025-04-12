import { Home, Info, HelpCircle, Mail,LayoutDashboard  } from "lucide-react"; // Import the icons
const userType = localStorage.getItem("userRole")?.toLowerCase(); // Get user type from local storage
export const navLinks = [
  { to: "/", icon: <Home size={18} />, text: "Home" },
  { to: "/about", icon: <Info size={18} />, text: "About" },
  { to: "/help", icon: <HelpCircle size={18} />, text: "Help" },
  { to: "/contact", icon: <Mail size={18} />, text: "Contact Us" },
  { to: `/${userType}Dashboard`, icon: <LayoutDashboard  size={18} />, text: "Dashboard" },
];