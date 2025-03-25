import { useState, useEffect } from 'react';
import { colors } from "../../Constants/Colors";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserAlt, FaEnvelope, FaCalendarAlt, FaUserFriends, FaSearch, FaFileMedical } from 'react-icons/fa';

function Patients() {
  const patientsData = [
    { id: 1, name: "Zoya Ahmed", email: "zoya@gmail.com", lastDate: "February 14, 2025", appointments: 3, status: "Active" },
    { id: 2, name: "Muhammad Ali", email: "mali@gmail.com", lastDate: "February 15, 2025", appointments: 1, status: "Inactive" },
    { id: 3, name: "Sarah Khan", email: "sarah@gmail.com", lastDate: "February 16, 2025", appointments: 5, status: "Active" },
    { id: 4, name: "Imran Khalid", email: "imran@gmail.com", lastDate: "February 17, 2025", appointments: 2, status: "Active" },
    { id: 5, name: "Aisha Malik", email: "aisha@gmail.com", lastDate: "February 18, 2025", appointments: 4, status: "Inactive" },
  ];
  
  const [patients, setPatients] = useState(patientsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setPatients(patientsData);
    } else {
      const filtered = patientsData.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPatients(filtered);
    }
  }, [searchTerm]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
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
            Patient <span className="text-blue-600">Records</span>
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
            View and manage all patients in your care
          </motion.p>
        </motion.div>

        {/* Search and Stats Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Stats Card */}
            <motion.div 
              className="flex items-center bg-white p-4 rounded-xl shadow-md w-full md:w-auto"
              whileHover={{ y: -2 }}
            >
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <FaUserFriends className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Total Patients
                </h3>
                <p className="text-2xl font-bold text-gray-900">{patientsData.length}</p>
              </div>
            </motion.div>

            {/* Search Bar */}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search patients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FaSearch className="w-5 h-5" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Patients Grid */}
        {patients.length === 0 ? (
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
              <h3 className="mt-2 text-lg font-medium text-gray-900">No patients found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search query to find what you're looking for.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {patients.map((patient) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer"
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center">
                    <FaUserAlt className="text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">
                      {patient.name}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        <FaEnvelope className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Email
                        </h3>
                        <p className="text-gray-700 text-sm">{patient.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        <FaCalendarAlt className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Last Visit
                        </h3>
                        <p className="text-gray-700">{patient.lastDate}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        <FaFileMedical className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Total Appointments
                        </h3>
                        <p className="text-gray-700">{patient.appointments}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Patient Detail Modal */}
        <AnimatePresence>
          {selectedPatient && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 w-full max-w-md max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <div className="flex items-center">
                    <FaFileMedical className="text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">
                      Patient Details - {selectedPatient.name}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedPatient.status)}`}>
                    {selectedPatient.status}
                  </span>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Full Name
                      </h3>
                      <p className="text-gray-900 font-medium">{selectedPatient.name}</p>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Email Address
                      </h3>
                      <p className="text-gray-700">{selectedPatient.email}</p>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Last Visit Date
                      </h3>
                      <p className="text-gray-700">{selectedPatient.lastDate}</p>
                    </div>

                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Total Appointments
                      </h3>
                      <p className="text-gray-700">{selectedPatient.appointments}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                    <motion.button
                      type="button"
                      onClick={() => setSelectedPatient(null)}
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

export default Patients;