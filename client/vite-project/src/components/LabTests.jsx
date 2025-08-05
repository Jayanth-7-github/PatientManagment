import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3211/api";

const LabTests = () => {
  const [tests, setTests] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`${BASE_URL}/tests`).then((res) => setTests(res.data));
  }, []);

  const handleBooking = async (testId) => {
    if (!patientId) {
      setMessage("Please enter your Patient ID to book a test.");
      return;
    }
    try {
      await axios.post(`${BASE_URL}/bookings`, {
        patient: patientId,
        test: testId,
      });
      setMessage("Test booked successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to book test.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md text-center">
      <h2 className="text-3xl font-semibold mb-4">Available Lab Tests</h2>
      <input
        type="text"
        placeholder="Enter your Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        className="mb-4 w-full max-w-sm p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <ul className="space-y-3 text-left">
        {tests.map((test) => (
          <li
            key={test._id}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >
            <div>
              <b>{test.name}</b> - {test.description} (${test.price})
            </div>
            <button
              onClick={() => handleBooking(test._id)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Book
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LabTests;
