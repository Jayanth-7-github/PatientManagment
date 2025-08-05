const mongoose = require("mongoose");

// Schema for bookings
const BookingSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
  bookingDate: { type: Date, default: Date.now },
});
const Booking = mongoose.model("Booking", BookingSchema);
module.exports = { Booking };
