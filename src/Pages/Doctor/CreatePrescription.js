import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserInjured, FaUserMd, FaPills, FaClock, FaCalendarAlt } from "react-icons/fa";
import { colors } from "../../Constants/Colors";

function CreatePrescription() {
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    medicines: [{ name: "", dosage: "", frequency: "" }],
    instructions: "",
    duration: "",
    doctorSignature: "Dr. Raza Khan",
    status: "Active"
  });

  const [showQRCode, setShowQRCode] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const qrCodeRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMedicineChange = (index, e) => {
    const { name, value } = e.target;
    const newMedicines = [...formData.medicines];
    newMedicines[index][name] = value;
    setFormData(prev => ({
      ...prev,
      medicines: newMedicines
    }));
  };

  const addMedicineField = () => {
    setFormData(prev => ({
      ...prev,
      medicines: [...prev.medicines, { name: "", dosage: "", frequency: "" }]
    }));
  };

  const removeMedicineField = (index) => {
    if (formData.medicines.length > 1) {
      const newMedicines = [...formData.medicines];
      newMedicines.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        medicines: newMedicines
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQrValue(JSON.stringify(formData));
    setShowQRCode(true);
    setShowSuccessModal(true);
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
            Create <span className="text-blue-600">New Prescription</span>
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
            Fill out the form below to create a digital prescription for your patient
          </motion.p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <FaCalendarAlt className="text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                {formData.date}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Patient and Doctor Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <FaUserInjured className="text-blue-600 text-xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Patient Information
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      placeholder="Patient Full Name"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="email"
                      name="patientEmail"
                      value={formData.patientEmail}
                      onChange={handleChange}
                      placeholder="Patient Email"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <FaUserMd className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Prescribing Doctor
                  </h3>
                  <p className="text-gray-900 font-medium">{formData.doctorSignature}</p>
                </div>
              </div>
            </div>

            {/* Medicines Section */}
            <div className="mb-8">
              <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                <FaPills className="text-blue-500 mr-2" />
                Prescribed Medications
              </h3>
              
              {formData.medicines.map((medicine, index) => (
                <div key={index} className="mb-4 pl-2 border-l-4 border-blue-200">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
                        <input
                          type="text"
                          name="name"
                          value={medicine.name}
                          onChange={(e) => handleMedicineChange(index, e)}
                          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                        <input
                          type="text"
                          name="dosage"
                          value={medicine.dosage}
                          onChange={(e) => handleMedicineChange(index, e)}
                          placeholder="e.g., 500mg"
                          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                        <input
                          type="text"
                          name="frequency"
                          value={medicine.frequency}
                          onChange={(e) => handleMedicineChange(index, e)}
                          placeholder="e.g., Every 8 hours"
                          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    {formData.medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMedicineField(index)}
                        className="mt-2 text-red-500 text-sm hover:text-red-700"
                      >
                        Remove Medicine
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addMedicineField}
                className="mt-2 text-blue-500 hover:text-blue-700 flex items-center text-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Another Medicine
              </button>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="flex items-center text-sm font-semibold text-gray-900 mb-2">
                  <FaClock className="text-blue-500 mr-2" />
                  Treatment Duration
                </h3>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 7 days"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Additional Instructions
                </h3>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  placeholder="Special instructions for the patient"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-full min-h-[100px]"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
              <motion.button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Generate Prescription QR Code
              </motion.button>
            </div>
          </form>
        </div>

        {/* QR Code Section */}
        <AnimatePresence>
          {showQRCode && (
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mt-8 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Prescription QR Code
              </h3>
              <div className="flex flex-col items-center">
                <div ref={qrCodeRef} className="mb-4">
                  <QRCodeSVG 
                    value={qrValue} 
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <motion.button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={downloadQRCode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download QR Code
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-6 rounded-xl shadow-xl text-center max-w-sm w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Prescription Created Successfully!
                </h3>
                <p className="text-gray-600 mb-6">
                  The QR code has been generated. You can download it or print it for your patient.
                </p>
                <div className="flex justify-center space-x-4">
                  <motion.button
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={closeSuccessModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CreatePrescription;