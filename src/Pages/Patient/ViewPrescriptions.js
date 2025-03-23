import React from "react";
import { motion } from "framer-motion"; // Import framer-motion
import { colors } from "../../Constants/Colors"; // Import custom colors

const prescriptions = [
  {
    patient: "saneha@gmail.com",
    doctor: "raza@gmail.com",
    date: "2/14/2025",
    medicines: ["Panadol", "Amoxicillin"],
    dosage: "Twice a day",
    doctorSignature: "Dr. Raza",
  },
  {
    patient: "saneha@gmail.com",
    doctor: "raza@gmail.com",
    date: "2/14/2025",
    medicines: ["Ibuprofen", "Paracetamol"],
    dosage: "Once a day",
    doctorSignature: "Dr. Raza",
  },
];

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger the animation of child elements
    },
  },
};

// Animation variants for each prescription card
const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 10 },
  },
  hover: {
    y: -5, // Slight lift on hover
    boxShadow: `0px 8px 16px ${colors.primary}20`, // Subtle shadow with primary color opacity
    transition: { type: "spring", stiffness: 300 },
  },
};

const ViewPrescriptions = () => {
  return (
    <motion.div
      className="min-h-screen flex justify-center py-8 px-4 sm:px-6"
      style={{ backgroundColor: colors.background }} // Use colors.background
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-4xl">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold" style={{ color: colors.primary }}>
            Prescription Records
          </h2>
          <motion.div
            className="w-24 h-1.5 mx-auto mt-3 rounded-full"
            style={{ backgroundColor: colors.secondary }}
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
          <motion.p
            className="text-lg mt-4"
            style={{ color: colors.textLight }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Digital prescriptions from your doctor
          </motion.p>
        </motion.div>

        {/* Prescription Cards */}
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {prescriptions.map((prescription, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={cardVariants}
              whileHover="hover" // Apply hover effect
            >
              {/* Patient and Doctor Info */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm" style={{ color: colors.textLight }}>
                    <span className="font-semibold" style={{ color: colors.primary }}>
                      Patient:
                    </span>{" "}
                    <span style={{ color: colors.darkBlue }}>{prescription.patient}</span>
                  </p>
                  <p className="text-sm" style={{ color: colors.textLight }}>
                    <span className="font-semibold" style={{ color: colors.primary }}>
                      Doctor:
                    </span>{" "}
                    <span style={{ color: colors.darkBlue }}>{prescription.doctor}</span>
                  </p>
                </div>
                <p className="text-sm" style={{ color: colors.textLight }}>
                  <span className="font-semibold" style={{ color: colors.primary }}>
                    Date:
                  </span>{" "}
                  <span style={{ color: colors.darkBlue }}>{prescription.date}</span>
                </p>
              </div>

              {/* Medicines List */}
              <div className="mb-4">
                <p className="font-semibold mb-2" style={{ color: colors.primary }}>
                  Prescribed Medicines:
                </p>
                <ul className="ml-4 border-l-4 pl-2" style={{ borderColor: colors.secondary }}>
                  {prescription.medicines.map((med, i) => (
                    <li key={i} className="text-gray-700 mb-1">
                      {med}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dosage Schedule */}
              <div className="mb-4">
                <p className="font-semibold mb-2" style={{ color: colors.primary }}>
                  Dosage Schedule:
                </p>
                <p className="ml-4 border-l-4 pl-2" style={{ borderColor: colors.secondary }}>
                  {prescription.dosage}
                </p>
              </div>

              {/* Doctor's Signature */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm" style={{ color: colors.textLight }}>
                  <span className="font-semibold" style={{ color: colors.primary }}>
                    Doctor's Signature:
                  </span>{" "}
                  <span style={{ color: colors.darkBlue }}>{prescription.doctorSignature}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ViewPrescriptions;