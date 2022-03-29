const { DataTypes } = require("sequelize");
let db = require("../config/database");

let City = db.define("cities", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    shippingTime: {
        type: DataTypes.DATE,
        allowNull: false
    }, 
    shippingCost: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true
});


module.exports = City;