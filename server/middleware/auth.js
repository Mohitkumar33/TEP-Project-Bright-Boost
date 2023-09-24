// middleware/auth.js

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, admin) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.admin = admin;
    next();
  });
}

module.exports = authenticateToken;
