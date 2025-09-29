const express=require("express");
const  router=express.Router();
const transporter=require("../models/transporterdata");
const jwt = require("jsonwebtoken");
const path=require("path");
const truck= require("../models/truck");
const booking = require("../models/booking");

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
router.get("/transportbooking",(rea,res)=>{
  res.sendFile(path.join(__dirname,"../public/transporterbook.html"))
})
router.get("/trucklist",isAuth,(req,res)=>{
  res.sendFile(path.join(__dirname,"../public/trucklist.html"));
})
router.get("/bookednav",(req,res)=>{
  res.sendFile(path.join(__dirname,"../public/bookedtruck.html"))
})
router.get("/transportdashbord",isAuth,(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/transportdashbord.html"));
});
router.get("/allocate",(req,res)=>{
  res.sendFile(path.join(__dirname,"../public/bookingtruck.html"));
})


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
router.get("/alltrucklist",isAuth,async(req,res)=>{
    try{
const data =await truck.findAll({where:{TransporterId:req.transporter.id}});
res.json(data);
    }catch(error){
        console.log("error while finding total number of truck",error);
    }
})
router.get("/booktruck",isAuth,async(req,res)=>{
    try{
const data =await truck.findAll({where:{TransporterId:req.transporter.id ,status:"notbook"}});
res.json(data);
    }catch(error){
        console.log("error while finding total number of truck",error);
    }})
router.post("/deletetruck",isAuth,async(req,res)=>{
  const{ id }= req.body
  try{
await truck.destroy({where:{id:id}});
res.redirect("/trucklist")

  }catch(err){
console.log("error while deleting truck ",err);
  }
})
router.get("/transportbook",isAuth,async(req,res)=>{
try{
const data =await booking.findAll({where:{name:req.transporter.transportname,status:"booked",truckno:"not"}});
res.json(data);
}catch(error){
console.log("error while loading booked data who book in transporterpage",error)
}
})
router.post("/allocatetruck",isAuth,async(req,res)=>{
const{truckid,userid}=req.body

  try{
 const data = await booking.findAll({where:{id:userid}});
 if(data.length>1 || data.length==0){
  console.log("error while findeing data");
  return res.send("error while allocateind truck ")
 };
 const truckdata= await truck.findOne({where:{id:truckid}});
 data[0].truckno=truckdata.trucknumber;
 truckdata.status="booked";
 await truckdata.save();
await data[0].save();
res.redirect("/transportdashbord")

  }catch(error){
console.log("erreoe while updateing the data ",error);
  }
})
router.post("/updatestatus",isAuth,async(req,res)=>{
  const {truckno}=req.body;
  try{
 const data=await truck.findOne({where:{trucknumber:truckno}});
 data.status="notbook";
 await data.save();
 res.redirect("/transportdashbord");
  }catch(err){
    console.log("error while returing truck to notbook status ",err)
  }
})
module.exports=router;
