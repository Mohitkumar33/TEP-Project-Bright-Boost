const express = require('express');
const router = express.Router();
const { Teachers } = require('../models');
const authenticateToken = require("../middleware/auth");

// Route to get all teachers
router.get('/',authenticateToken, async (req, res) => {
  try {
    const teachers = await Teachers.findAll();
    res.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
