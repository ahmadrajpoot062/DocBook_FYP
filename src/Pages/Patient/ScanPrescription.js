import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../../Constants/Colors";
import { useNavigate } from "react-router-dom";
import QrScanner from "qr-scanner"; // Library for scanning QR codes
import { FiUpload, FiCamera, FiArrowLeft } from "react-icons/fi"; // Icons for better UX

function ScanPrescription() {
  const [scannedData, setScannedData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError("No file selected.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setScannedData(null);

    // Scan the uploaded image for QR code
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then((result) => {
        try {
          console.log("Scanned Data:", result.data); // Debugging
          const parsedData = JSON.parse(result.data);
          console.log("Parsed Data:", parsedData); // Debugging
          setScannedData(parsedData);
        } catch (err) {
          console.error("Error parsing QR code:", err); // Debugging
          setError("Invalid QR code. Please upload a valid prescription QR code.");
        }
      })
      .catch((err) => {
        console.error("Error scanning QR code:", err); // Debugging
        setError("Failed to scan the QR code. Please ensure the image contains a valid QR code.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Go back to the previous page
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: colors.background }}
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>
            Scan Prescription
          </h2>
          <p className="text-gray-600">
            Upload the QR code image to view your prescriptions.
          </p>
        </div>

        {/* File Upload Section */}
        <div className="mb-6">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <motion.button
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => fileInputRef.current.click()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading} // Disable button while uploading
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </div>
            ) : (
              <>
                <FiUpload className="text-lg" />
                Upload QR Code
              </>
            )}
          </motion.button>
        </div>

        {/* Display Scanned Data */}
        {scannedData && (
          <motion.div
            className="mt-6 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>
              Prescription Details
            </h3>
            <div className="space-y-3">
              <p>
                <span className="font-semibold">Patient Name:</span>{" "}
                {scannedData.patientName}
              </p>
              <p>
                <span className="font-semibold">Medicines:</span>{" "}
                {scannedData.medicines}
              </p>
              <p>
                <span className="font-semibold">Schedule:</span> {scannedData.schedule}
              </p>
              <p>
                <span className="font-semibold">Instructions:</span>{" "}
                {scannedData.instructions}
              </p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            className="mt-6 p-4 bg-red-100 text-red-600 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.div>
        )}

        {/* Go Back Button */}
        <motion.button
          className="mt-6 w-full flex items-center justify-center gap-2 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition-colors"
          onClick={goBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiArrowLeft className="text-lg" />
          Go Back
        </motion.button>
      </motion.div>
    </div>
  );
}

export default ScanPrescription;