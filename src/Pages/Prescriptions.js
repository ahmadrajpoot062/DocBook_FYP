'use client';

import { useState } from 'react';
import { colors } from "../Constants/Colors";
import { motion } from "framer-motion";

function Input({ className, ...props }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        className={`border p-3 pl-12 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${className}`}
        {...props}
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
        <SearchIcon />
      </div>
    </div>
  );
}

function SearchIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m2.85-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function Card({ className, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white p-6 shadow-lg rounded-lg border-l-4 hover:shadow-xl transition-shadow duration-300 ${className}`}
      style={{ borderLeftColor: colors.primary }}
    >
      {children}
    </motion.div>
  );
}

function CardContent({ children }) {
  return <div className="space-y-4">{children}</div>;
}

const prescriptions = [
  {
    email: 'zoya@gmail.com',
    medicines: 'Panadol 1-tablet, Paracetamol 2-tablets',
    schedule: 'Once a day, night',
    createdOn: 'February 14, 2025',
  },
  {
    email: 'john@gmail.com',
    medicines: 'Ibuprofen 1-tablet',
    schedule: 'Twice a day',
    createdOn: 'February 15, 2025',
  },
  {
    email: 'emma@gmail.com',
    medicines: 'Vitamin C 1-tablet',
    schedule: 'Once a day, morning',
    createdOn: 'February 16, 2025',
  },
];

function Prescriptions() {
  const [search, setSearch] = useState('');

  // Filter prescriptions in real-time based on the search term
  const filteredData = prescriptions.filter((p) =>
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen p-8"
      style={{ backgroundColor: colors.background }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold text-gray-800 pb-4 text-center"
      >
        Prescription Records
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-600 mb-8 text-lg text-center max-w-2xl"
      >
        Manage and view digital prescriptions for your patients with ease. Search by patient email to find specific records.
      </motion.p>

      <div className="w-full max-w-2xl mb-12">
        <Input
          type="text"
          placeholder="Search by patient email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm"
        />
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.map((prescription, index) => (
          <Card key={index} className="p-6 hover:scale-105 transition-transform duration-300">
            <CardContent>
              <p className="text-blue-600 font-semibold text-xl mb-2">
                Patient: {prescription.email}
              </p>
              <p className="text-gray-700">
                <strong>Medicines:</strong> {prescription.medicines}
              </p>
              <p className="text-gray-700">
                <strong>Schedule:</strong> {prescription.schedule}
              </p>
              <p className="text-gray-500 text-sm mt-4">
                Created on: {prescription.createdOn}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}

export default Prescriptions;