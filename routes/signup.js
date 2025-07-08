const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const TaskModule = require("../schema.js");

router.post("/add", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!email || !username || !password ||!role) {
      return res.status(400).json({ message: "Missing required field" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newTask = new TaskModule({
      username,
      email,
      password: hash,
      role,
    });
    await newTask.save();
    res.status(201).json({ message: "Added successfully", newTask });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
