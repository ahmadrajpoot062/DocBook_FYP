import { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { colors } from "../Constants/Colors";
import { navLinks } from "../Constants/navigationConfig"; // Import the navigation config

function Footer({ trigger }) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 100);
  }, [trigger]);

  return (
    <footer
      ref={ref}
      style={{ backgroundColor: colors.primary }}
      className="text-white py-12 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={animate && inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h1 style={{ color: colors.white }} className="text-3xl font-bold mb-4">
              DocBook
            </h1>
            <p style={{ color: colors.white }} className="text-sm">
              Your trusted healthcare platform for seamless doctor-patient connections.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={animate && inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h2 style={{ color: colors.white }} className="text-lg font-bold mb-4">
              Quick Links
            </h2>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.to}
                    style={{ color: colors.white }}
                    className="hover:text-purple-300 transition-all duration-300 hover:pl-2 block"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Follow Us Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={animate && inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center md:text-left"
          >
            <h2 style={{ color: colors.white }} className="text-lg font-bold mb-4">
              Follow Us
            </h2>
            <div className="flex justify-center md:justify-start space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ color: colors.white }}
                  className="hover:text-purple-300 transition-all duration-300"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={animate && inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="border-t border-white border-opacity-20 pt-8 mt-8 text-center"
        >
          <p style={{ color: colors.white }} className="text-sm">
            © 2025 MediCare. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;