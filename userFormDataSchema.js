const mongoose=require("mongoose");
const FormData= new mongoose.Schema(
    {
username:String,
email:String,
number:String,
link:String,
formText:String,
cv:String,
jobid:String,
eligible:{
    type:String,
    enum:['Yes','No']
},
office:{
    type:String,
    enum:['Yes','No']
},
    }
)
const FormModule = mongoose.model("Userform", FormData);
module.exports = FormModule;