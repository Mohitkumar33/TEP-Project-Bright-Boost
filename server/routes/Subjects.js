const express = require('express');
const router = express.Router();
const { Subjects } = require('../models');
const authenticateToken = require("../middleware/auth");

// Route to get all subjects
router.get('/',authenticateToken, async (req, res) => {
  try {
    const subjects = await Subjects.findAll();
    res.json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
