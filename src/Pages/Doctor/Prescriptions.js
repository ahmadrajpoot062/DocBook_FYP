'use client';

import { useState } from 'react';
import { colors } from "../../Constants/Colors";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFileMedical, FaCalendarAlt, FaClock, FaPills, FaUser } from "react-icons/fa";

const prescriptions = [
  {
    id: 1,
    patientName: "Zoya Khan",
    patientEmail: 'zoya@gmail.com',
    medicines: [
      { name: "Panadol", dosage: "1 tablet", frequency: "Once daily" },
      { name: "Paracetamol", dosage: "2 tablets", frequency: "Every 6 hours" }
    ],
    instructions: "Take with food. Avoid alcohol.",
    duration: "7 days",
    createdOn: 'February 14, 2025',
    status: "Active",
    doctorSignature: "Dr. Raza Khan"
  },
  {
    id: 2,
    patientName: "John Smith",
    patientEmail: 'john@gmail.com',
    medicines: [
      { name: "Ibuprofen", dosage: "1 tablet", frequency: "Twice daily" },
      { name: "Antacid", dosage: "1 tablet", frequency: "After meals" }
    ],
    instructions: "Take with plenty of water.",
    duration: "5 days",
    createdOn: 'February 15, 2025',
    status: "Completed",
    doctorSignature: "Dr. Raza Khan"
  },
  {
    id: 3,
    patientName: "Emma Johnson",
    patientEmail: 'emma@gmail.com',
    medicines: [
      { name: "Vitamin C", dosage: "1 tablet", frequency: "Morning" },
      { name: "Calcium supplement", dosage: "1 tablet", frequency: "With breakfast" }
    ],
    instructions: "Continue for 30 days then re-evaluate.",
    duration: "30 days",
    createdOn: 'February 16, 2025',
    status: "Active",
    doctorSignature: "Dr. Raza Khan"
  },
];

function Prescriptions() {
  const [search, setSearch] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const filteredData = prescriptions
    .filter(p => (
      p.patientName.toLowerCase().includes(search.toLowerCase()) ||
      p.patientEmail.toLowerCase().includes(search.toLowerCase()) ||
      p.medicines.some(m => m.name.toLowerCase().includes(search.toLowerCase()))
    ))
    .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const closeModal = () => {
    setSelectedPrescription(null);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.background }}
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
            Prescription <span className="text-blue-600">Records</span>
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
            View and manage all digital prescriptions you've created for your patients
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="relative w-full max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search by patient name, email or medicine..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-2 border-gray-300 p-4 pl-14 rounded-xl w-full focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 text-lg placeholder-gray-400"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaSearch className="w-5 h-5" />
            </div>
          </div>
        </motion.div>

        {/* Prescriptions List */}
        {filteredData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <div className="mx-auto max-w-md">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No prescriptions found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search query to find what you're looking for.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {filteredData.map((prescription) => (
              <motion.div
                key={prescription.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer"
                onClick={() => setSelectedPrescription(prescription)}
              >
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">
                      {prescription.createdOn}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(prescription.status)}`}>
                    {prescription.status}
                  </span>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Patient Info */}
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <FaUser className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Patient
                        </h3>
                        <p className="text-gray-900 font-medium">{prescription.patientName}</p>
                        <p className="text-gray-600 text-sm">{prescription.patientEmail}</p>
                      </div>
                    </div>

                    {/* Medicines Summary */}
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <FaPills className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Prescribed Medicines
                        </h3>
                        <ul className="list-disc list-inside text-gray-700 text-sm">
                          {prescription.medicines.slice(0, 2).map((med, idx) => (
                            <li key={idx}>{med.name} ({med.dosage})</li>
                          ))}
                          {prescription.medicines.length > 2 && (
                            <li className="text-blue-600">+{prescription.medicines.length - 2} more</li>
                          )}
                        </ul>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <FaClock className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Treatment Duration
                        </h3>
                        <p className="text-gray-700">{prescription.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Prescription Detail Modal */}
        <AnimatePresence>
          {selectedPrescription && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center">
                    <FaFileMedical className="text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">
                      Prescription Details - {selectedPrescription.createdOn}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedPrescription.status)}`}>
                    {selectedPrescription.status}
                  </span>
                </div>

                <div className="p-6">
                  {/* Patient and Doctor Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <FaUser className="text-blue-600 text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Patient Information
                        </h3>
                        <p className="text-gray-900 font-medium">{selectedPrescription.patientName}</p>
                        <p className="text-gray-600">{selectedPrescription.patientEmail}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <FaUser className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Prescribing Doctor
                        </h3>
                        <p className="text-gray-900 font-medium">{selectedPrescription.doctorSignature}</p>
                      </div>
                    </div>
                  </div>

                  {/* Medicines Section */}
                  <div className="mb-8">
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                      <FaPills className="text-blue-500 mr-2" />
                      Prescribed Medications
                    </h3>
                    
                    {selectedPrescription.medicines.map((medicine, index) => (
                      <div key={index} className="mb-4 pl-2 border-l-4 border-blue-200">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
                              <p className="text-gray-900">{medicine.name}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                              <p className="text-gray-900">{medicine.dosage}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                              <p className="text-gray-900">{medicine.frequency}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Additional Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="flex items-center text-sm font-semibold text-gray-900 mb-2">
                        <FaClock className="text-blue-500 mr-2" />
                        Treatment Duration
                      </h3>
                      <p className="text-gray-700">{selectedPrescription.duration}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">
                        Additional Instructions
                      </h3>
                      <p className="text-gray-700 whitespace-pre-line">{selectedPrescription.instructions}</p>
                    </div>
                  </div>

                  {/* Close Button */}
                  <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                    <motion.button
                      type="button"
                      onClick={closeModal}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Prescriptions;