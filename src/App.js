import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import CreatePrescription from "./Pages/Doctor/CreatePrescription";
import Prescriptions from "./Pages/Doctor/Prescriptions";
import MyProfile from "./Pages/Doctor/MyProfile";
import Patients from "./Pages/Doctor/Patients";
import Appointments from "./Pages/Doctor/Appointments";
import About from "./Pages/About";
import Help from "./Pages/Help";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import Contact from "./Pages/Contact";
import Sidebar from "./Components/Sidebar";
import DoctorDashboard from "./Pages/Doctor/Dashboard"; // Default import
import PatientDashboard from "./Pages/Patient/Dashboard"; // Default import
import ViewPrescriptions from "./Pages/Patient/ViewPrescriptions";
import Reminders from "./Pages/Patient/Reminders";
import ScanPrescription from "./Pages/Patient/ScanPrescription";

function App() {
  const userType = "doctor"; // or "patient"

  return (
    
    // for all users 
    <Router> {/* Ensure Router is correctly used here */}
      <div className="App">
        <Navbar />
        <div className="content pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>

    // for doctor and patient
    // <Router>
    //   <div className="App flex min-h-screen">
    //     <Sidebar userType={userType} />
        
    //     <div className="content flex-1 p-4 lg:ml-64">
    //       <Routes>
    //         {userType === "doctor" && (
    //           <>
    //             <Route path="/" element={<DoctorDashboard />} />
    //             <Route path="/create_prescription" element={<CreatePrescription />} />
    //             <Route path="/prescriptions" element={<Prescriptions />} />
    //             <Route path="/patients" element={<Patients />} />
    //             <Route path="/my_profile" element={<MyProfile />} />
    //             <Route path="/my_appointments" element={<Appointments />} />
    //           </>
    //         )}

    //         {userType === "patient" && (
    //           <>
    //             <Route path="/" element={<PatientDashboard />} />
    //             <Route path="/scan_prescription" element={<ScanPrescription />} />
    //             <Route path="/view_prescriptions" element={<ViewPrescriptions />} />
    //             <Route path="/Reminders" element={<Reminders />} />
    //           </>
    //         )}
    //       </Routes>
    //     </div>
    //   </div>
    // </Router>
  );
}

export default App;