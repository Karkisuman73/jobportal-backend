const mongoose = require("mongoose")
const Verificationmodel= new mongoose.Schema(
    {
       username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }, 
  role: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 } 
    }
)
module.exports = mongoose.model("Verification", Verificationmodel);