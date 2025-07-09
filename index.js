const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const login = require("./routes/login.js");
const JobModule = require("./jobschema.js");
const tokenverify=require("./routes/tokenverify.js")
const signup = require("./routes/signup.js");
const listingjob = require("./routes/listingjob.js");
const userFormData =require("./routes/userFormData.js")
const profile = require("./routes/profile.js")
const EmailSent = require("./routes/EmailSent.js")
const joobseekerprofile=require("./routes/Joobseekerprofile.js")
const SeekerProfileInfo = require("./routes/SeekerProfileInfo.js")
const path=require("path");
const socketIo = require("socket.io")
const http = require("http");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());
const port = 3001;

const server= http.createServer(app);
const io = socketIo (server,{
  cors:{
    origin: "https://jobportal-frontend-pied.vercel.app",
    methods:["GET", "POST"],
    credentials: true,
  }
})

app.set("io", io);

io.on('connection',(socket)=>{
  console.log('Client connected:', socket.id);

  
})

mongoose
  .connect(
    "mongodb+srv://Suman7730:Sum%40n7730@cluster0.k4aiv10.mongodb.net/Juman?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connection establish success");
  })
  .catch((err) => {
    console.log(err);
    console.log("connection failed")
  });

app.use("/", signup);
app.use("/", login);
app.use("/", listingjob);
app.use("/",tokenverify);
app.use("/", userFormData );
app.use("/",EmailSent)
app.use("/",joobseekerprofile)
app.use("/",profile)
app.use("/",SeekerProfileInfo)
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

server.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
