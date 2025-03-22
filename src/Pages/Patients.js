import { useState, useEffect } from 'react';
import { colors } from "../Constants/Colors";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserAlt, FaEnvelope, FaCalendarAlt, FaUserFriends, FaSearch } from 'react-icons/fa';

function Card({ className, children, onClick }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`p-6 bg-white rounded-xl shadow-lg border-l-4 ${className}`} 
      style={{ borderLeftColor: colors.primary }}
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

function CardContent({ children }) {
  return <div>{children}</div>;
}

function Patients() {
  // Expanded sample data for demonstration
  const patientsData = [
    { id: 1, name: "Zoya Ahmed", email: "zoya@gmail.com", lastDate: "2/14/2025", appointments: 3 },
    { id: 2, name: "Muhammad Ali", email: "mali@gmail.com", lastDate: "2/15/2025", appointments: 1 },
    { id: 3, name: "Sarah Khan", email: "sarah@gmail.com", lastDate: "2/16/2025", appointments: 5 },
    { id: 4, name: "Imran Khalid", email: "imran@gmail.com", lastDate: "2/17/2025", appointments: 2 },
    { id: 5, name: "Aisha Malik", email: "aisha@gmail.com", lastDate: "2/18/2025", appointments: 4 },
  ];
  
  const [patients, setPatients] = useState(patientsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  // Filter patients based on search term
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

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center min-h-screen p-6" 
      style={{ backgroundColor: colors.background }}
    >
      {/* Page Header */}
      <motion.div 
        className="text-center mb-8" 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>Patients</h1>
        <p className="text-gray-500 text-lg">Here you can see all the patients you have dealt with.</p>
      </motion.div>

      {/* Stats & Search Section */}
      <motion.div 
        className="w-full max-w-4xl mb-8 flex flex-col sm:flex-row justify-between items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Total Patients Box */}
        <motion.div 
          className="w-full sm:w-auto py-4 px-6 rounded-lg font-medium flex items-center gap-3 shadow-sm"
          style={{ backgroundColor: `${colors.primary}15` }}
          whileHover={{ scale: 1.02 }}
        >
          <FaUserFriends style={{ color: colors.primary }} size={24} />
          <div>
            <p className="text-sm" style={{ color: colors.textLight }}>Total Patients</p>
            <p 
              className="text-xl font-bold"
              style={{ color: colors.primary }}
            >
              {patientsData.length}
            </p>
          </div>
        </motion.div>

        {/* Search Box */}
        <div className="w-full sm:w-auto flex relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: colors.textLight }}>
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Search patients..."
            className="pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ 
              border: `1px solid ${colors.border || "#e5e7eb"}`,
              backgroundColor: colors.secondary
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Patient Cards Grid */}
      <motion.div 
        className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {patients.length === 0 ? (
          <motion.div 
            className="col-span-full text-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p style={{ color: colors.textLight }}>No patients found matching your search.</p>
          </motion.div>
        ) : (
          patients.map((patient, index) => (
            <Card 
              key={patient.id} 
              onClick={() => setSelectedPatient(patient)}
              className="cursor-pointer"
            >
              <CardContent>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <FaUserAlt className="mr-2" style={{ color: colors.primary }} />
                    <h3 className="font-semibold">{patient.name}</h3>
                  </div>
                  <div 
                    className="text-xs px-2 py-1 rounded"
                    style={{ 
                      backgroundColor: `${colors.primary}15`,
                      color: colors.primary
                    }}
                  >
                    {patient.appointments} visits
                  </div>
                </div>
                
                <div className="flex items-center text-sm mb-2">
                  <FaEnvelope className="mr-2" style={{ color: colors.primary }} />
                  {patient.email}
                </div>
                
                <div className="flex items-center text-sm">
                  <FaCalendarAlt className="mr-2" style={{ color: colors.primary }} />
                  Last visit: {patient.lastDate}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </motion.div>

      {/* Patient Detail Modal */}
      <AnimatePresence>
        {selectedPatient && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPatient(null)}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="p-6 text-center"
                style={{ backgroundColor: colors.primary, color: colors.white }}
              >
                <h2 className="text-2xl font-bold">Patient Details</h2>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-lg font-semibold" style={{ color: colors.textDark }}>{selectedPatient.name}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-lg" style={{ color: colors.textDark }}>{selectedPatient.email}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Last Visit</p>
                  <p className="text-lg" style={{ color: colors.textDark }}>{selectedPatient.lastDate}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Total Appointments</p>
                  <p className="text-lg" style={{ color: colors.textDark }}>{selectedPatient.appointments}</p>
                </div>
                
                <div className="flex justify-end mt-6">
                  <motion.button
                    className="px-4 py-2 rounded-lg text-white"
                    style={{ backgroundColor: colors.primary }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPatient(null)}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Patients;