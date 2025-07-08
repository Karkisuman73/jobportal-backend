const express = require("express");
const TaskModule = require("../schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required field" });
    }

    const doexist = await TaskModule.findOne({ email });
    if (!doexist) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const ispasswordvalid = await bcrypt.compare(password, doexist.password);
    if (!ispasswordvalid) {
      return res.status(400).json({ message: "Password not valid" });
    }

    const token = jwt.sign(
      { id: doexist._id, email: doexist.email, role: doexist.role },
      "suman",
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "Login successful",
      username: doexist.username,
      role: doexist.role,
      token,
      role: doexist.role, 
      email
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
