import React from "react";
import { motion } from "framer-motion";
import { colors } from "../../Constants/Colors";
import { FaUserInjured, FaUserMd, FaCalendarAlt, FaPills, FaClock, FaSignature } from "react-icons/fa";

const prescriptions = [
  {
    patient: "saneha@gmail.com",
    doctor: "raza@gmail.com",
    date: "February 14, 2025",
    medicines: [
      { name: "Panadol", dosage: "500mg", frequency: "Every 6 hours" },
      { name: "Amoxicillin", dosage: "250mg", frequency: "Every 8 hours" }
    ],
    instructions: "Take with food. Complete full course of antibiotics.",
    duration: "7 days",
    doctorSignature: "Dr. Raza Khan",
    status: "Active"
  },
  {
    patient: "saneha@gmail.com",
    doctor: "raza@gmail.com",
    date: "January 28, 2025",
    medicines: [
      { name: "Ibuprofen", dosage: "400mg", frequency: "Every 8 hours" },
      { name: "Paracetamol", dosage: "500mg", frequency: "Every 6 hours as needed" }
    ],
    instructions: "Take with plenty of water. Do not exceed 4 doses in 24 hours.",
    duration: "5 days",
    doctorSignature: "Dr. Raza Khan",
    status: "Completed"
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 10 },
  },
  hover: {
    y: -5,
    boxShadow: `0px 10px 20px ${colors.primary}20`,
    transition: { type: "spring", stiffness: 300 },
  },
};

const statusBadge = {
  Active: "bg-green-100 text-green-800",
  Completed: "bg-blue-100 text-blue-800",
  Expired: "bg-gray-100 text-gray-800"
};

const ViewPrescriptions = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Your <span className="text-blue-600">Prescription</span> Records
          </h1>
          <motion.div
            className="w-24 h-1.5 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
          <motion.p
            className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            Digital prescriptions issued by your healthcare providers with detailed medication information
          </motion.p>
        </motion.div>

        {/* Prescription Cards */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {prescriptions.map((prescription, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    {prescription.date}
                  </span>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBadge[prescription.status]}`}>
                  {prescription.status}
                </span>
              </div>

              <div className="p-6">
                {/* Patient and Doctor Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <FaUserInjured className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Patient
                      </h3>
                      <p className="text-gray-900 font-medium">{prescription.patient}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <FaUserMd className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Prescribed By
                      </h3>
                      <p className="text-gray-900 font-medium">{prescription.doctor}</p>
                    </div>
                  </div>
                </div>

                {/* Medicines Section */}
                <div className="mb-6">
                  <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                    <FaPills className="text-blue-500 mr-2" />
                    Prescribed Medications
                  </h3>
                  <div className="space-y-4">
                    {prescription.medicines.map((medicine, i) => (
                      <div key={i} className="pl-2 border-l-4 border-blue-200">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-gray-800">{medicine.name}</h4>
                            <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {medicine.dosage}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Frequency:</span> {medicine.frequency}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="flex items-center text-sm font-semibold text-gray-900 mb-2">
                      <FaClock className="text-blue-500 mr-2" />
                      Treatment Duration
                    </h3>
                    <p className="text-gray-700 pl-6">{prescription.duration}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      Additional Instructions
                    </h3>
                    <p className="text-gray-700">{prescription.instructions}</p>
                  </div>
                </div>

                {/* Doctor's Signature */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-end">
                  <div className="text-right">
                    <div className="flex items-center justify-end">
                      <FaSignature className="text-blue-500 mr-2" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Authorized Signature
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium mt-1">{prescription.doctorSignature}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State (if no prescriptions) */}
        {prescriptions.length === 0 && (
          <motion.div
            className="bg-white rounded-xl shadow-sm p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <FaPills className="text-blue-400 text-3xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Prescriptions Found</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              You don't have any prescription records yet. All your digital prescriptions will appear here.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ViewPrescriptions;