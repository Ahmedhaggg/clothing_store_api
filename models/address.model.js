const { DataTypes } = require("sequelize");
let db = require("../config/database");

let Address = db.define("addresses", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    firstZone: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    secondZone: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    timestamps: true
});


module.exports = Address;