const express=require("express");
const router=express.Router();
const upload = require("../routes/multerHooks");
const ProfileModule = require("../profileschema");

router.post("/profile", upload.single("image"), async(req,res)=>{
    const data=req.body;
        try{
             const image=req.file? req.file.filename:null;
             console.log(image)
        const profile= new ProfileModule({image})
        const saveprofile=await profile.save();
        res.status(201).json(saveprofile)
    }
    catch(e){
        console.log(e)
    }
})

router.get("/profiledata",async(req,res)=>{
    try{
        const form=await ProfileModule.find()
        console.log(form)
        res.status(200).json(form)
    }
    catch(error)
    {
req.status(300),json({err:message.err})
    }
})
module.exports=router;