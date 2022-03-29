const { DataTypes } = require("sequelize");
let db = require("../config/database");

let Governorate = db.define("governorates", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false
    }
}, {
    timestamps: true
});


module.exports = Governorate;