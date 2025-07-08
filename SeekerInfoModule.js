const mongoose=require("mongoose")
const SeekerInfo=new mongoose.Schema({
 userId: String,
 jobpreference: String,
  aboutyourself: String,
  skills: [String],
  experiences: [String],
  education:[String],
  experties:[String],
  language:[String],
  text: String,
  age: String,
  location: String,
  experience: String,
  years:String,
})
const SeekerInfoModule = mongoose.model("SeekerInformation",SeekerInfo)
module.exports=SeekerInfoModule