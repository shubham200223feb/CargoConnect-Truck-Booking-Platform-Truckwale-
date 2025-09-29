require("dotenv").config();
const express = require("express");
const app=express();
const database = require("./util/databse");
const homerouter=require("./router/home");
const userliginsignup=require("./router/userloginsignup");
const transporterloginsignup=require("./router/transporterloginsignup");
const routertransportdetail=require("./router/transportdetail");
const showtransporter=require("./router/userdashbord");
const transportdashbord=require("./router/transportdashbord");
const cookie = require("cookie-parser");
const truck=require("./models/truck");
const transport=require("./models/transporterdata");
const booking = require("./models/booking");
const user =require("./models/userdata");
user.hasMany(booking);
booking.belongsTo(user);
transport.hasMany(truck);
truck.belongsTo(transport);

const port = 3000;


(async()=>{
    database.sync({alter:true})
    try{
console.log("databasr is conected sucessfully")
    }catch(error){
        console.log("error while conecting with dtaabse".error);
    }
    
})();
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(homerouter);
app.use(userliginsignup);
app.use(transporterloginsignup);
app.use(routertransportdetail);
app.use(showtransporter);
app.use(transportdashbord);

app.listen(port,()=>{
    console.log("server is listening at port 3000");
})