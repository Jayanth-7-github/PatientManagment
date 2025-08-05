import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import PatientRegistration from "./components/PatientRegistration";
import LabTests from "./components/LabTests";
import BookingsHistory from "./components/BookingsHistory";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <nav className="fixed top-0 w-full bg-blue-300 p-4 flex justify-center md:justify-between items-center gap-6 md:gap-0 px-6 shadow-md z-50">
        {/* Use NavLink for active link styling */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-black no-underline font-medium hover:text-blue-700 ${
              isActive ? "underline" : ""
            }`
          }
          end
        >
          Register Patient
        </NavLink>
        <NavLink
          to="/tests"
          className={({ isActive }) =>
            `text-black no-underline font-medium hover:text-blue-700 ${
              isActive ? "underline" : ""
            }`
          }
        >
          Available Lab Tests
        </NavLink>
        <NavLink
          to="/bookings"
          className={({ isActive }) =>
            `text-black no-underline font-medium hover:text-blue-700 ${
              isActive ? "underline" : ""
            }`
          }
        >
          Bookings History
        </NavLink>
      </nav>

      {/* To prevent content hidden behind fixed nav */}
      <div className="pt-20 max-w-7xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<PatientRegistration />} />
          <Route path="/tests" element={<LabTests />} />
          <Route path="/bookings" element={<BookingsHistory />} />
          <Route
            path="/login"
            element={<Login onLogin={() => alert("Logged in successfully!")} />}
          />
          <Route path="*" element={<div className="text-center mt-10">Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
