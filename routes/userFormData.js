const express=require("express");
const FormModule = require("../userFormDataSchema");
const router = express.Router();
const upload = require("../routes/multerHooks")

    router.post('/formdata',upload.single("cv"), async(req,res)=>{
        const data=req.body
        console.log(req.file)
        console.log(data)
    
        const filename=req.file? req.file.filename:null;
        try{
            const formdata= new FormModule({...data,filename,cv: filename});
            const saveform = await formdata.save();
            res.status(201).json(saveform)
        }
        catch(error)
        {
    res.status(500).json({ message: error.message });
        }

    })

router.get("/userFormData",async(req,res)=>{
    try{
        const form=await FormModule.find({})
        res.status(200).json(form)
    }
    catch(error)
    {
req.status(300),json({err:message.err})
    }
})

router.get("/form/count",async(req,res)=>{
    try{
const count= await FormModule.countDocuments({})
res.json(count)
    }
    catch(e)
    {

    }
})

router.delete("/deleteinbox/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    await FormModule.findByIdAndDelete(id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports=router;