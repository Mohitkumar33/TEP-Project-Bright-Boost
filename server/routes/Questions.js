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

router.post("/", authenticateToken, async (req, res) => {
  try {
    // Assuming you have request body data that contains the question details
    const {
      studentName,
      studentID,
      question,
      subjectName,
      subjectID,
      openAt,
      closeAt,
    } = req.body;

    // Create a new question record in the database
    const newQuestion = await Questions.create({
      studentName,
      studentID,
      question,
      subjectName,
      subjectID,
      openAt,
      // closeAt,
    });

    // Respond with the newly created question
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/close", authenticateToken, async (req, res) => {
  const { id, closeTime } = req.body;

  try {
    // Find the question by ID and update its status and closeAt
    const question = await Questions.findByPk(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Update the status to "closed"
    question.status = "closed";

    // Set the closeAt value to the received closeTime
    question.closeAt = closeTime;

    await question.save();

    res.json({ message: "Question has been closed." });
  } catch (error) {
    console.error("Error closing question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
