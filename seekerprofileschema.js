const mongoose=require("mongoose")
const SeekerProfile= new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        image:String,
    }
)
const SeekerModule= mongoose.model("SeekerProfile",SeekerProfile)
module.exports =SeekerModule
