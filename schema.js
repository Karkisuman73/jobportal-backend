const mongoose = require("mongoose");
const Task = new mongoose.Schema({
  username: String,
  email: { type: String, required: [true, "Email is required"], unique: [true, "Email already exist"] },
  password: String,
  role: String,
});
const TaskModule = mongoose.model("Signup", Task);
module.exports = TaskModule;
