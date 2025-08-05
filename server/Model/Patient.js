const mongoose = require("mongoose");

// Schema for patient registration
const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String },
});

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = { Patient };
