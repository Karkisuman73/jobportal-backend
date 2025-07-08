const express = require("express");
const router = express.Router();
const upload = require("./multerHooks");
const SeekerModule = require("../seekerprofileschema");


router.post("/seekerprofile", upload.single("image"), async (req, res) => {
  try {
    const image = req.file ? req.file.filename : null;
    const { userId } = req.body;
    console.log(userId)

    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    console.log(" image:", image);

    let seeker = await SeekerModule.findOne({ userId });

    if (seeker) {
      seeker.image = image;
    } else {
      seeker = new SeekerModule({ userId, image });
    }

    const savedSeeker = await seeker.save();
    res.status(201).json(savedSeeker);
  } catch (e) {
    console.error("Image upload error:", e);
    res.status(500).json({ message: "Image upload failed" });
  }
});


router.get("/seekerprofile", async (req, res) => {
  try {
    const profiles = await SeekerModule.find();
    res.status(200).json(profiles);
  } catch (e) {
    console.error("Fetch profile error:", e);
    res.status(500).json({ message: "Failed to fetch profiles" });
  }
});

module.exports = router;
