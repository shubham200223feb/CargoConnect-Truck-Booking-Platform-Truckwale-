const express=require("express");
const router = express.Router();
const transporter= require("../models/transporterdata");
const path =require("path");
const jwt = require("jsonwebtoken");
const bcryp=require("bcrypt");

router.get("/signupastransporter",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/transportersignup.html"))
});
router.post("/transportersignup",async(req,res)=>{
const{username,email,password,phone}=req.body;
try{
const newpassword = await bcryp.hash(password,10);

await transporter.create({transportname:username,email:email,phone:phone,password:newpassword});
const transportertoken= jwt.sign({email:email},process.env.JWT);
res.cookie("transporttoken",transportertoken);
console.log("transportet is signup sucessfully");
res.sendFile(path.join(__dirname,"../public/addtransport.html"));

}catch(err){
    console.log("error while signup the transporter",err);
}
})
router.get("/transporterlogin",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/transporterlogin.html"))
});
router.post("/logintransporter",async(req,res)=>{
    const{email,password}=req.body;
    try{
        const data = await transporter.findOne({where:{email:email}});
        if(!data){
            return res.redirect("/signupastransporter");
        }
        let compare=await bcryp.compare(password,data.password);
        if(!compare){
           return  res.send(`
                <script>
            alert("Your password is wrong, please retry");
            window.location.href="/transporterlogin";
        </script>
                `)
            
        }
        const transportertoken=jwt.sign({email:email},process.env.JWT);
        res.cookie("transporttoken",transportertoken)
res.redirect("/transportdashbord");

    }catch(err){

    }
})
module.exports=router;