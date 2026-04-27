const express=require('express');
const mongoose=require('mongoose');

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("__dirname"));

mongoose.connect("mongodb://127.0.0.1:27017/eventdb");

const Event=mongoose.model("Event",{
    name:String,
    email:String,
    eventname:String,
});

app.post("/add",async(req,res)=>{
    await new Event(req.body).save();
    res.send("Event Registered Successfully");
});
app.get("/view", async(req,res)=>{
    const event=await Event.find();
    res.send(event);
});
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/event.html");
});
app.listen(3000,()=>{
   console.log("server is running at http://localhost:3000");
});