const express = require("express");
const router = express.Router();
const TaskModule = require("../schema.js");
const Verificationmodel = require("../Verificationmodel.js");

router.post("/verifyotp", async (req, res) => {
  const { email, code } = req.body;

  try {
    const record = await Verificationmodel.findOne({ email });

    if (!record || record.code !== code) {
      return res.status(400).json({ message: "Invalid or expired verification code" });
    }

    const existingUser = await TaskModule.findOne({ email: record.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new TaskModule({
      username: record.username,
      email: record.email,
      password: record.password, 
      role: record.role,
    });

    await newUser.save();
    await Verificationmodel.deleteOne({ email });

    res.status(201).json({ message: "Email verified and account created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
