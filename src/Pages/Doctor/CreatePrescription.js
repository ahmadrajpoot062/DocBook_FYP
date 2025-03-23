import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "../../Constants/Colors";

function CreatePrescription() {
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [medicines, setMedicines] = useState("");
  const [schedule, setSchedule] = useState("");
  const [instructions, setInstructions] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const qrCodeRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const prescriptionData = {
      patientName,
      patientEmail,
      medicines,
      schedule,
      instructions,
    };
    setQrValue(JSON.stringify(prescriptionData)); // Ensure JSON.stringify is used
    setShowQRCode(true);
    setShowSuccessModal(true);

    // Clear form fields
    setPatientName("");
    setPatientEmail("");
    setMedicines("");
    setSchedule("");
    setInstructions("");
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const downloadQRCode = () => {
    const svgElement = qrCodeRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "prescription-qr-code.png";
      downloadLink.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 py-8"
      style={{ backgroundColor: colors.background }}
    >
      <motion.div
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg flex flex-col lg:flex-row gap-6 sm:gap-8"
        style={{ maxWidth: "64rem", width: "100%" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Form Section */}
        <div className="flex-1">
          <motion.h2
            className="text-2xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Create Prescription
          </motion.h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <motion.input
              type="text"
              placeholder="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
            <motion.input
              type="email"
              placeholder="Patient Email"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            />
            <motion.textarea
              placeholder="Medicines (comma separated)"
              value={medicines}
              onChange={(e) => setMedicines(e.target.value)}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            <motion.textarea
              placeholder="Schedule (e.g., Twice a day)"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            />
            <motion.textarea
              placeholder="Instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            />

            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Create Prescription
            </motion.button>
          </form>
        </div>

        {/* QR Code Section */}
        <AnimatePresence>
          {showQRCode && (
            <motion.div
              className="flex-1 flex flex-col items-center justify-center mt-6 sm:mt-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Prescription QR Code</h3>
              <div ref={qrCodeRef}>
                <QRCodeSVG value={qrValue} size={150} className="sm:w-200" />
              </div>
              <motion.button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={downloadQRCode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download QR Code
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg text-center mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <motion.div
                className="text-green-500 text-4xl mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                ✔
              </motion.div>
              <h3 className="text-lg font-bold text-gray-800">Prescription Created!</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                The prescription has been successfully created.
              </p>
              <motion.button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={closeSuccessModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                OK
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CreatePrescription;