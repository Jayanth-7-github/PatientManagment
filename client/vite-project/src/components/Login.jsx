import React, { useState } from "react";
import axios from "axios";

const BASE_URL = "https://skvap-patientmanagment.onrender.com/api";

const Login = ({ onLogin }) => {
  const [patientId, setPatientId] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, { patientId });
      localStorage.setItem("token", res.data.token);
      onLogin && onLogin(res.data.patient);
      setError("");
      alert("Login successful!");
    } catch (err) {
      setError("Login failed. Please check your Patient ID.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login with Patient ID</h2>
      <input
        type="text"
        placeholder="Enter your Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className="w-full px-4 py-2 border rounded mb-4"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Login;
