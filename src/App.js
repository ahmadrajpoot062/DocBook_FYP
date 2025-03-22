import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import CreatePrescription from "./Pages/CreatePrescription"
import Prescriptions from "./Pages/Prescriptions";
import MyProfile from "./Pages/MyProfile";
import Patients from "./Pages/Patients";
import Appointments from "./Pages/Appointments";
import About from "./Pages/About";
import Help from "./Pages/Help";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import Contact from "./Pages/Contact"
import Sidebar from "./Components/Sidebar"
import Dashboard from "./Pages/Dashboard";

function App() {
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

    // for doctors

    <Router>
      <div className="App flex min-h-screen">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content on the right */}
        <div className="content flex-1 p-4 ml-64"> {/* Adjust margin to match sidebar width */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create_prescription" element={<CreatePrescription />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/my_profile" element={<MyProfile />} /> 
            <Route path="/my_appointments" element={<Appointments />} /> 
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

