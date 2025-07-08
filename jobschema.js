const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema({
 companyname: {type:String, required:true},
  // id:{type:String, required:true},
  position: {type:String, required:true},
  level: {type:String, required:true},
  type: {type:String, required:true},
  time: {type:String, required:true},
  view: {type:String, required:true},
  aboutCompany: {type:String, required:true},
  responsibilities: {type:String, required:true},
  requiredSkills: {type:String, required:true},
  roleDescription: {type:String, required:true},
  category:{type:String, required:true},
  location:{type:String,required:true},
});
const JobModule = mongoose.model("JobPost", JobSchema);
module.exports = JobModule;
