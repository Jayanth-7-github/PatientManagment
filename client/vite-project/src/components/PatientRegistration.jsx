import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 

const BASE_URL = "http://localhost:3211/api";

const PatientRegistration = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/patients`, form);
      const { patient, token } = res.data;

      localStorage.setItem("token", token);

      setMessage(`Patient registered! ID: ${patient._id}`);
      setForm({
        name: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
        email: "",
      });
    } catch (error) {
      setMessage(error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded shadow mt-20">
      <h2 className="text-center text-2xl font-semibold mb-4">
        Patient Registration
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="p-2 rounded border"
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
          className="p-2 rounded border"
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          className="p-2 rounded border"
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="p-2 rounded border"
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="p-2 rounded border"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          type="email"
          className="p-2 rounded border"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}

      {/* login */}
      <p className="text-center mt-4 text-sm">
        Already registered?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default PatientRegistration;
