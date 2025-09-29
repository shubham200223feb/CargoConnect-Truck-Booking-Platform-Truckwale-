
const database = require("../util/databse");
const { DataTypes } = require("sequelize");

const TransporterDetail = database.define("Transporterdetail", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, 
        primaryKey: true,  
    },
    transportname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = TransporterDetail;
