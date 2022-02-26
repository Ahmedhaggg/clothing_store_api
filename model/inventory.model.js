const { DataTypes } = require("sequelize");
let db = require("../config/database");

let Inventory = db.define("inventories", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = Inventory;