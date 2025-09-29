const express=require("express");
const router=express.Router();
const User= require("../models/userdata");
const path = require("path");
const bcryp = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendResetEmail=require("../util/email");
router.get("/signupuser",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/signupuser.html"));
});
router.post("/signupuser",async(req,res)=>{
    const{username,phone,email,password}=req.body;
    
    try{
        const data = await User.findOne({ where: { email: email } });
if (data) {
    return res.send(`
        <script>
            alert("User already found, please login");
            window.location.href = "./login";
        </script>
    `);
}
        const newpassword=await bcryp.hash(password,10);
        await User.create({username:username,email:email,password:newpassword,phone:phone});
        await sendResetEmail(email);
        const usertoken =await jwt.sign({email:email},process.env.JWT);
        res.cookie("usertoken",usertoken);
        console.log("enter data in database");
        res.redirect("/userdashbord")

    }catch(error){
        console.log("error while saveing dta in database",error);
    }

})
router.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/loginuser.html"));
})
router.post("/login",async(req,res)=>{
    const{email,password}=req.body;
    try{
const data = await User.findOne({where:{email:email}});
if(!data){
    return res.redirect("/signupuser")
}
const compare= await bcryp.compare(password,data.password);
if(!compare){
     return res.send(`
        <script>
        alert("password is wrong plss enter correct password");
        window.location.href="/login";
        `)
}
const usertoken =jwt.sign({email:email},process.env.JWT);
res.cookie("usertoken",usertoken);
res.redirect("/userdashbord")
    }catch(error){
        console.log("error while findeing user in database",error);
    }
})
module.exports=router;