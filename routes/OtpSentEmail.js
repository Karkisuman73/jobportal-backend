const nodemailer = require("nodemailer");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.Email_User,
    pass: process.env.Email_Pass,
  },
});

const sendVerificationEmail = async (to, code) => {
  const mailOptions = {
    from: process.env.Email_User,
    to: to,
    subject: "Email Verification Code",
    text: `Your verification code is: ${code}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
