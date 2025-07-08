const express = require("express");
const multer = require("multer");
const router = express.Router();
const SeekerInfoModule = require("../SeekerInfoModule");


const upload = multer(); 

router.post("/information", async (req, res) => {
  try {
    const data = req.body;
    console.log("Received data:", data);

    const { userId, skills, experiences,education,experties,language } = data;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const safeSkills = Array.isArray(skills) ? skills : JSON.parse(skills || "[]");
    const safeExperiences = Array.isArray(experiences) ? experiences : JSON.parse(experiences || "[]");
    const safeEducation = Array.isArray(education) ? education : JSON.parse(education || "[]");
    const safeExperties = Array.isArray(experties) ? experties : JSON.parse(experties || "[]");
    const safeLanguage = Array.isArray(language) ? language : JSON.parse(language || "[]");

    const information = new SeekerInfoModule({
      ...data,
      skills: safeSkills,
      experiences: safeExperiences,
      education:safeEducation,
      experties:safeExperties,
      language:safeLanguage
    });

    const saveInfo = await information.save();
    res.status(201).json({ message: "Sent successfully", data: saveInfo });
  } catch (e) {
    console.error("Error saving information:", e);
    res.status(400).json({ message: "Error sending data" });
  }
});


router.get("/seekerInfo", async (req, res) => {
    try {
        const info = await SeekerInfoModule.find({});
        res.status(200).json(info);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "error occur" });
    }
});

module.exports = router;
