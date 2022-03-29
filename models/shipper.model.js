const { DataTypes } = require("sequelize");
let db = require("../config/database");

let Shipper = db.define("shippers", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ["busy", "available"]
    }
}, {
    timestamps: true
});


module.exports = Shipper;