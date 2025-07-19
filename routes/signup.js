const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const TaskModule = require("../schema.js");
const Verificationmodel = require("../Verificationmodel.js")
const sendVerificationEmail = require ("../routes/OtpSentEmail.js")

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

router.post("/add", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!email || !username || !password ||!role) {
      return res.status(400).json({ message: "Missing required field" });
    }

    const existingUser = await TaskModule.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // const newTask = new TaskModule({
    //   username,
    //   email,
    //   password: hash,
    //   role,
    // });
    // await newTask.save();

    const code = generateCode();
    await Verificationmodel.findOneAndUpdate(
      { email },
      {
    username,
    email,
    password: hash,
    role,
    code,
    createdAt: new Date()
  },
      { upsert: true }
    );

    // Send email with code
    await sendVerificationEmail(email, code);

    res.status(201).json({ message: "Registration successfully. Verificattion code sent to email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
