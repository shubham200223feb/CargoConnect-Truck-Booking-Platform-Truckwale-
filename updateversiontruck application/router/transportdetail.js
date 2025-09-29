const express=require("express");
const router=express.Router();
const path =require("path");
const Transporterdetail=require("../models/transporterdetail");

router.post("/addtransport",async(req,res)=>{
   const{transportname,email,phone,owner,address,city,state}=req.body
   try{
    await Transporterdetail.create({transportname:transportname,email:email,phone:phone,address:address,city:city,state:state,owner:owner});
    res.redirect("/transportdashbord")
   }catch(err){
    console.log("error in added transport ")
   }
});
module.exports=router;