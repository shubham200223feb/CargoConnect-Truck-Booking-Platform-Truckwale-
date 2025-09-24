const express= require("express");
const router=express.Router();
const path=require("path")
const Transporter= require("../models/transporterdetail");
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
module.exports=router;