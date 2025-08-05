const express = require("express");
const { Patient } = require("../Model/Patient");
const { Booking } = require("../Model/Bookings");
const { Test } = require("../Model/Test");
const path = require("path");
const authMiddleware = require('../middleware/auth');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

// Routes for patient registration

router.post("/patients", async (req, res) => {
  try {
    const { name, age, gender, phone, address, email } = req.body;
    if (!name || !age || !gender || !phone) {
      return res.status(400).send("All fields are required.");
    }

    const patient = new Patient({
      name,
      age,
      gender,
      phone,
      address,
      email,
    });
    await patient.save();

    // Generate JWT token
    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure:true,
      sameSite:"None"
    });

    // Send patient + token
    res.status(201).json({ patient, token });
  } catch (error) {
    res.status(400).send(error.message || "Error registering patient");
  }
});

router.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Routes for lab tests
router.post("/tests", async (req, res) => {
  try {
    const { patientId, name, description, price } = req.body;
    if (!name || !description || !price) {
      return res.status(400).send("All fields are required.");
    }
    const test = new Test({
      patientId,
      name,
      description,
      price,
    });
    await test.save();
    res.status(201).send(test);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/tests", async (req, res) => {
  try {
    const tests = await Test.find().populate("patientId");
    res.status(200).send(tests);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Routes for bookings
router.post("/bookings", async (req, res) => {
  try {
    const { patient, test } = req.body;
    const booking = new Booking({
      patient,
      test,
    });
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/bookings", authMiddleware, async (req, res) => {
  try {
    const patientId = req.user.id;

    const bookings = await Booking.find({ patient: patientId })
      .populate("patient")
      .populate("test");

    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send(error.message || "Error fetching bookings");
  }
});


// Route to download a report (dummy implementation)
router.get("/:id/report", (req, res) => {
  const dummyPdfPath = path.join(__dirname, "../reports", "dummy_report.pdf");

  res.download(dummyPdfPath, "report.pdf", (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Failed to download report");
    }
  });
});



router.post("/login", async (req, res) => {
  try {
    const { patientId } = req.body;

    if (!patientId) {
      return res.status(400).send("Patient ID is required.");
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).send("Patient not found.");
    }

    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, {
      expiresIn: "30d", // Token valid for 30 days
    });
      res.cookie("token", token, {
      httpOnly: true,
      secure:true, 
      sameSite:"None"
    });

    res.status(200).json({ token, patient });
  } catch (error) {
    res.status(500).send("Login failed.");
  }
});

module.exports = router;
