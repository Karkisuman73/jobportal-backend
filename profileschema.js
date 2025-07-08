const mongoose=require("mongoose");
const ProfileData= new mongoose.Schema(
    {
image:String,

    }
)
const ProfileModule = mongoose.model("UserImage", ProfileData);
module.exports = ProfileModule;