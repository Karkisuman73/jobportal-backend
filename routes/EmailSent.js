const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const FormModule = require("../userFormDataSchema");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Email_User,
        pass: process.env.Email_Pass
    }
});

router.post("/notification/:email", async (req, res) => {
    const email = req.params.email;
    const { status,id } = req.body;
    console.log(id)

    try {
        const useremail = await FormModule.findOne({ email });

        if (!useremail) {
            return res.status(404).json({ message: "Email not found" });
        }

        let subject, text;

        if (status === "accepted") {
            subject = "Your CV Has Been Accepted";
            text = `Dear ${useremail.username},\n\n` +
                   `We are pleased to inform you that your CV has been reviewed and accepted for the next stage of our recruitment process. Our team will reach out to you shortly regarding further steps.\n\n` +
                   `Thank you for your interest in joining our organization.\n\n` +
                   `Regards,\nTeam`;
        } else if (status === "rejected") {
            subject = "Update on Your Application";
            text = `Dear ${useremail.username},\n\n` +
                   `Thank you for taking the time to apply and submit your CV. After careful review, we regret to inform you that we will not be moving forward with your application at this time.\n\n` +
                   `We appreciate your interest in our company and encourage you to apply again in the future for other opportunities.\n\n` +
                   `Regards,\nTeam`;
        } else {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const mailOptions = {
            from: process.env.Email_User,
            to: email,
            subject,
            text
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("Email error:", err);
                return res.status(500).json({ message: "Failed to send email" });
            } else {
                console.log("Email sent:", info.response);
                return res.status(200).json({
                    message: "Email sent successfully",
                    useremail
                });
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
