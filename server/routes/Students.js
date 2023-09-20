// routes/students.js

const express = require('express');
const router = express.Router();
const { Students } = require('../models');

// Route to get all students
router.get('/', async (req, res) => {
  try {
    const students = await Students.findAll();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
