const database = require("../util/databse");
const { DataTypes } = require("sequelize");

const transporter = database.define("Transporter", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,  // ✅ auto increment primary key
        primaryKey: true,
    },
    transportname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = transporter;
