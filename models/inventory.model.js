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
    },
    size: {
        type: DataTypes.ENUM,
        values: ["sm", "md", "l", "sl", "xl", "xx", "3x"],
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = Inventory;