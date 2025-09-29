const database = require("../util/databse");
const { DataTypes } = require("sequelize");

const truck = database.define("truck", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,  // ✅ auto increment primary key
        primaryKey: true,
    },
    ownername: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    wheel: {
        type: DataTypes.STRING,
        allowNull: false,
       
        
    },
    year: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    trucknumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    capacity:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    model:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    status:{
        type:DataTypes.STRING,
        defaultValue:"notbook",
        allowNull:false,
    }
});
module.exports=truck;