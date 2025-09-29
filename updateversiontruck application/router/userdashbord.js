const express= require("express");
const router=express.Router();
const path=require("path")
const Transporter= require("../models/transporterdetail");
const jwt = require("jsonwebtoken");
const User= require("../models/userdata");
const booking=require("../models/booking");
const {Op}=require("sequelize")


const isAuth=async(req, res, next)=> {
  const token = req.cookies.usertoken;
  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = await User.findOne({where:{email:decoded.email}});
    next();
  } catch {
    res.redirect("/login");
  }
};
router.get("/userbooking",(req,res)=>{
res.sendFile(path.join(__dirname,"../public/userbooking.html"))
})
router.get("/userpanding",(req,res)=>{
  res.sendFile(path.join(__dirname,"../public/userpanding.html"))
})
router.get("/userdashbord",(req,res)=>{
res.sendFile(path.join(__dirname,"../public/userdashbord.html"))
})
router.get("/search", async (req, res) => {
  try {
    const { city, state } = req.query;

    // Dynamic filters
    const filters = {};
    if (city) filters.city = city;        
    else if (state) filters.state = state; 

    const results = await Transporter.findAll({ where: filters });

    res.json(results); // JSON me return
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});
router.post("/formbook",isAuth,async(req,res)=>{
  const{transporter,phone,status}=req.body;
 try{
 
  if(status=="not_booked"){
    
    return res.redirect("/userdashbord");
  }
 
    await booking.create({name:transporter,phone:phone ,status:"booked",username:req.user.username,UserId:req.user.id,userphone:req.user.phone});
    res.redirect("/userdashbord");
  
 }catch(err){
console.log("error while adding data in booking tabel",err);
 }
})
router.get("/booking",isAuth,async(req,res)=>{
  try{
    const data = await booking.findAll({where:{status:"booked",truckno: { [Op.ne]: "not" }  }})
    res.json(data);

  }catch(error){
    console.log("error while loading to booking page",error);
  }
})
router.get("/pending",isAuth,async(req,res)=>{
  try{
    const data = await booking.findAll({where:{status:"booked",truckno:"not"}})
    res.json(data);

  }catch(error){
    console.log("error while loading to pending page",error);
  }
})
router.get("/bookingcount",isAuth,async(req,res)=>{
  try{
const data = await booking.findAll({where:{UserId:req.user.id,status:"booked",truckno: { [Op.ne]: "not" } }})
let count = data.length;
res.json({num:count})
  }catch(error){
console.log("error while finding the count of booking",error);
  }
});
router.get("/pendingcount",isAuth,async(req,res)=>{
  try{
const data = await booking.findAll({where:{UserId:req.user.id,status:"booked" ,truckno:"not"}})
let count = data.length;
res.json({num:count})
  }catch(error){
console.log("error while finding the count of pending",error);
  }
})
module.exports=router;