const express=require('express');
const mongoose=require('mongoose');

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("__dirname"));

mongoose.connect("mongodb://127.0.0.1:27017/Studentdb");

const Student=mongoose.model("Student",{
    Name:String,
    Rollno:String,
    Branch:String
});

app.post("/add" , async(req,res)=>{
  await new Student(req.body).save();
  res.send("data added");
});

app.get("/view" , async(req,res)=>{
    const data=await Student.find();
    res.send(data);
});

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/index.html");
});
app.listen(3000,()=>{
    console.log("server is running at http://localhost:3000");
});
