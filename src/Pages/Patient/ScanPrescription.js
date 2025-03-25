import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../../Constants/Colors";
import { useNavigate } from "react-router-dom";
import QrScanner from "qr-scanner";
import { FaUserInjured, FaUserMd, FaPills, FaClock, FaCalendarAlt, FaSignature, FaArrowLeft, FaUpload, FaQrcode } from "react-icons/fa";

function ScanPrescription() {
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError("No file selected.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setScannedData(null);

    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then((result) => {
        try {
          const parsedData = JSON.parse(result.data);
          setScannedData(parsedData);
        } catch (err) {
          console.error("Error parsing QR code:", err);
          setError("Invalid QR code. Please upload a valid prescription QR code.");
        }
      })
      .catch((err) => {
        console.error("Error scanning QR code:", err);
        setError("Failed to scan the QR code. Please ensure the image contains a valid QR code.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const goBack = () => {
    navigate(-1);
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
            Scan <span className="text-blue-600">Prescription</span>
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
            Upload the QR code image to view your prescription details
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Upload Section */}
          <div className="p-6">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="bg-blue-100 p-6 rounded-full mb-6">
                <FaQrcode className="text-blue-600 text-4xl" />
              </div>
              
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <motion.button
                className="flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => fileInputRef.current.click()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Scanning...
                  </>
                ) : (
                  <>
                    <FaUpload className="text-lg" />
                    Upload QR Code
                  </>
                )}
              </motion.button>
              
              <p className="text-gray-500 mt-4 text-sm">
                Supported formats: JPG, PNG, GIF
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="mt-6 p-4 bg-red-100 text-red-600 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {error}
              </motion.div>
            )}
          </div>

          {/* Scanned Data Display */}
          <AnimatePresence>
            {scannedData && (
              <motion.div
                className="border-t border-gray-200 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Prescription Details
                </h3>
                
                <div className="space-y-6">
                  {/* Patient and Doctor Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <FaUserInjured className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                          Patient
                        </h3>
                        <p className="text-gray-900 font-medium">{scannedData.patientName}</p>
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
                        <p className="text-gray-900 font-medium">{scannedData.doctor || "Dr. Raza Khan"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <FaCalendarAlt className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Date
                      </h3>
                      <p className="text-gray-900 font-medium">
                        {scannedData.date || new Date().toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Medicines */}
                  <div>
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                      <FaPills className="text-blue-500 mr-2" />
                      Prescribed Medications
                    </h3>
                    <div className="space-y-4">
                      {Array.isArray(scannedData.medicines) ? (
                        scannedData.medicines.map((medicine, i) => (
                          <div key={i} className="pl-2 border-l-4 border-blue-200">
                            <div className="bg-blue-50 rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <h4 className="font-bold text-gray-800">{medicine.name || medicine}</h4>
                                {medicine.dosage && (
                                  <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    {medicine.dosage}
                                  </span>
                                )}
                              </div>
                              {medicine.frequency && (
                                <p className="text-sm text-gray-600 mt-1">
                                  <span className="font-medium">Frequency:</span> {medicine.frequency}
                                </p>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="pl-2 border-l-4 border-blue-200">
                          <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-gray-800">{scannedData.medicines}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="flex items-center text-sm font-semibold text-gray-900 mb-2">
                        <FaClock className="text-blue-500 mr-2" />
                        Treatment Duration
                      </h3>
                      <p className="text-gray-700 pl-6">{scannedData.duration || "Not specified"}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">
                        Additional Instructions
                      </h3>
                      <p className="text-gray-700">{scannedData.instructions || "None provided"}</p>
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
                      <p className="text-gray-900 font-medium mt-1">
                        {scannedData.doctorSignature || scannedData.doctor || "Dr. Raza Khan"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back Button */}
        <motion.button
          className="mt-8 flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          onClick={goBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className="text-lg" />
          Back to Dashboard
        </motion.button>
      </div>
    </div>
  );
}

export default ScanPrescription;