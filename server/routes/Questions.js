const express = require("express");
const router = express.Router();
const { Questions } = require("../models");
const authenticateToken = require("../middleware/auth");

// Route to get all questions
router.get("/", authenticateToken, async (req, res) => {
  try {
    const questions = await Questions.findAll();
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
