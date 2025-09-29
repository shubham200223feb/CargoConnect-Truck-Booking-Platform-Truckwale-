const{DataTypes}= require("sequelize");
const database=require("../util/databse");
const booking= database.define("Booking",{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    userphone:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    truckno:{
        type:DataTypes.STRING,
        defaultValue:"not"
    }
});
module.exports=booking;