const mongoose = require("mongoose");


// Schema for lab tests
const TestSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  name: { type: String , required: true },
  description: { type: String , required: true },
  price: { type: Number , required: true },
});

const Test = mongoose.model("Test", TestSchema);

module.exports = { Test };
