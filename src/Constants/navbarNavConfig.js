import { Home, Info, HelpCircle, Mail } from "lucide-react"; // Import the icons

export const navLinks = [
  { to: "/", icon: <Home size={18} />, text: "Home" },
  { to: "/about", icon: <Info size={18} />, text: "About" },
  { to: "/help", icon: <HelpCircle size={18} />, text: "Help" },
  { to: "/contact", icon: <Mail size={18} />, text: "Contact Us" },
];