const express = require("express");
const router = express.Router();
const { StudentAttendence } = require("../models");
const authenticateToken = require("../middleware/auth");

// Route to get all students Attendence
router.get("/", authenticateToken, async (req, res) => {
  try {
    const studentsAttendence = await StudentAttendence.findAll();
    res.json(studentsAttendence);
  } catch (error) {
    console.error("Error fetching students Attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
