import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import CreatePrescription from "./Pages/Doctor/CreatePrescription";
import Prescriptions from "./Pages/Doctor/Prescriptions";
import MyProfile from "./Pages/Doctor/MyProfile";
import Patients from "./Pages/Doctor/Patients";
import DoctorAppointments from "./Pages/Doctor/Appointments";
import PatientAppointments from "./Pages/Patient/Appointments";
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
import Doctors from "./Pages/Patient/Doctors";
import DoctorProfile from "./Pages/Patient/DoctorProfile";
import BookAppointment from "./Pages/Patient/BookAppointment";
import RequestSubmitted from "./Pages/Patient/RequestSubmitted";
import AppointmentCancelled from "./Pages/Patient/AppointmentCancelled";

function App() {
  const userType = "patient"; // or "patient"

  return (

    // for all users 
    // <Router> {/* Ensure Router is correctly used here */}
    //   <div className="App">
    //     <Navbar />
    //     <div className="content pt-16">
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/about" element={<About />} />
    //         <Route path="/help" element={<Help />} />
    //         <Route path="/login" element={<LoginPage />} />
    //         <Route path="/signup" element={<SignUpPage />} />
    //         <Route path="/contact" element={<Contact />} />
    //       </Routes>
    //     </div>
    //     <Footer />
    //   </div>
    // </Router>
    

    // for doctor and patient
    <Router>
      <div className="App flex min-h-screen">
        <Sidebar userType={userType} />

        <div className="content flex-1 p-4 lg:ml-64">
          <Routes>
            {userType === "doctor" && (
              <>
                <Route path="/" element={<DoctorDashboard />} />
                <Route path="doctor/create_prescription" element={<CreatePrescription />} />
                <Route path="doctor/prescriptions" element={<Prescriptions />} />
                <Route path="doctor/patients" element={<Patients />} />
                <Route path="doctor/my_profile" element={<MyProfile />} />
                <Route path="doctor/my_appointments" element={<DoctorAppointments />} />
              </>
            )}

            {userType === "patient" && (
              <>
                <Route path="/" element={<PatientDashboard />} />
                <Route path="patient/scan_prescription" element={<ScanPrescription />} />
                <Route path="patient/view_prescriptions" element={<ViewPrescriptions />} />
                <Route path="patient/doctors" element={<Doctors />} />
                <Route path="patient/doctors/Doctor_Profile" element={<DoctorProfile />} />
                <Route path="patient/doctors/Book_Appointment" element={<BookAppointment />} />
                <Route path="patient/doctors/Book_Appointment/Request_submitted" element={<RequestSubmitted />} />
                <Route path="patient/doctors/Doctor_Profile/Book_Appointment" element={<BookAppointment />} />
                <Route path="patient/doctors/Doctor_Profile/Book_Appointment/Request_submitted" element={<RequestSubmitted />} />
                <Route path="patient/Reminders" element={<Reminders />} />
                <Route path="patient/my_appointments" element={<PatientAppointments />} />
                <Route path="patient/my_appointments/AppointmentCancelled" element={<AppointmentCancelled />} />                
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;