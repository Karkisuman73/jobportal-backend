const express = require("express");
const JobModule = require("../jobschema.js");
const router = express.Router();

router.post("/job", async (req, res) => {
  try {
    // const data= req.body

    const newjob = new JobModule(req.body);
    const savejob = await newjob.save();
    res.status(201).json(savejob);


    const io = req.app.get("io")
    console.log("data",savejob)
    io.emit("job-posted",savejob)


    const seekers = await getAllSeekers();


    for (const seeker of seekers) {
  const notification = new Notification({
    userId: seeker._id,
    message: `New job posted by ${savejob.companyname}`,
    jobId: savejob._id,
  });

  await notification.save();

    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/joblist", async (req, res) => {
  try {
    const task = await JobModule.find({});
    res.status(200).json(task);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
});

router.put("/jobedit/:id", async (req, res) => {
  const {id} = req.params;
  const data = req.body;
  console.log(data);

  try {
    const task = await JobModule.findByIdAndUpdate(id, data, { new: true });
    if (!task) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    await JobModule.findByIdAndDelete(id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.get("/jobs/count", async (req, res) => {
//   try {
//     const count = await JobModule.countDocuments();
//     res.json({ count }); 
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error getting job count" });
//   }
// });


module.exports = router;
