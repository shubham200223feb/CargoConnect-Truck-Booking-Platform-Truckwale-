const {Sequelize}= require("sequelize");
const database = new Sequelize("transport","root","root",{
    host:"localhost",
    dialect:"mysql"
});
module.exports=database;