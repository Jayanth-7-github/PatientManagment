import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://skvap-patientmanagment.onrender.com/api";

const BookingsHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch {
        alert("Failed to load bookings.");
      }
    };
    fetchBookings();
  }, []);

  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}/report`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `report-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      alert("Failed to download report.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md text-center">
      <h2 className="text-3xl font-semibold mb-6">Bookings History</h2>
      {bookings.length === 0 && <p>No bookings yet.</p>}
      <ul className="space-y-4 text-left">
        {bookings.map((b) => (
          <li
            key={b._id}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >
            <div>
              Patient: {b.patient?.name} | Test: {b.test?.name} | Date:{" "}
              {new Date(b.bookingDate).toLocaleString()}
            </div>
            <button
              onClick={() => handleDownload(b._id)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Download Report
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsHistory;
