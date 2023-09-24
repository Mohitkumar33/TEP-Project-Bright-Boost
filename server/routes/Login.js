const express = require("express");
const router = express.Router();

const { Admins } = require("../models");
const { Students } = require("../models");
const { Teachers } = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/adminLogin", (req, res) => {
  res.json("hello mohit");
});

router.post("/adminLogin", async (req, res) => {
  const { email, password } = req.body;

  // Find the admin by email
  const admin = await Admins.findOne({ where: { email } });
  if (!admin || !bcrypt.compareSync(password, admin.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.REACT_APP_JWT_SECRET,
    {
      expiresIn: "1h", // Token expires in 1 hour
    }
  );

  res.json({ token, fullName: admin.fullName });
  //   res.send("hello mohit");
});

router.post("/studentLogin", async (req, res) => {
  const { email, password } = req.body;

  // Find the student by email
  const student = await Students.findOne({ where: { email } });
  if (!student || !bcrypt.compareSync(password, student.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: student.id, email: student.email },
    process.env.REACT_APP_JWT_SECRET,
    {
      expiresIn: "1h", // Token expires in 1 hour
    }
  );

  res.json({ token, fullName: student.fullName });
  //   res.send("hello mohit");
});

router.post("/teacherLogin", async (req, res) => {
  const { email, password } = req.body;

  // Find the teacher by email
  const teacher = await Teachers.findOne({ where: { email } });
  if (!teacher || !bcrypt.compareSync(password, teacher.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: teacher.id, email: teacher.email },
    process.env.REACT_APP_JWT_SECRET,
    {
      expiresIn: "2h", // Token expires in 2 hour
    }
  );

  res.json({ token, fullName: teacher.fullName });
  //   res.send("hello mohit");
});

module.exports = router;
