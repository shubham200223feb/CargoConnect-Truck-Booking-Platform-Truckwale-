const express=require("express");
const  router=express.Router();
const transporter=require("../models/transporterdata");
const jwt = require("jsonwebtoken");
const path=require("path");
const truck= require("../models/truck");

// Middleware to check JWT
const isAuth=async(req, res, next)=> {
  const token = req.cookies.transporttoken;
  if (!token) return res.redirect("/transporterlogin");

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.transporter = await transporter.findOne({where:{email:decoded.email}});
    next();
  } catch {
    res.redirect("/transporterlogin");
  }
};
router.get("/transportdashbord",isAuth,(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/transportdashbord.html"));
});


router.post("/add-truck",isAuth,async(req,res)=>{
    const{ownername,year,capacity,phone,model,trucknumber,wheel}=req.body;
try{
await truck.create({ownername:ownername,year:year,capacity:capacity,phone:phone,model:model,trucknumber:trucknumber,wheel:wheel,TransporterId:req.transporter.id});
console.log("truck is added sucesssfully");
res.redirect("/transportdashbord");
}catch(error){
console.log("error while adding dat in dastabase",error);
}

})
router.get("/alltruck",isAuth,async(req,res)=>{
    try{
const data =await truck.findAll({where:{TransporterId:req.transporter.id}});
let count=data.length;
res.json({num:count});
    }catch(error){
        console.log("error while finding total number of truck",error);
    }
})
module.exports=router;
