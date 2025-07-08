const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Secret should ideally come from environment variable
const JWT_SECRET = "suman";

router.post("/verify", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No or invalid token format" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token", error: err.message });
    }

    return res.json({
      message: "User is authenticated",
      user: decoded,
    });
  });
});

module.exports = router;
