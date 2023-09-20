const express = require("express");
const router = express.Router();

const { Admins } = require("../models");

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

module.exports = router;
