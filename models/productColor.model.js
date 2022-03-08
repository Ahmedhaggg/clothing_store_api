const { DataTypes } = require("sequelize");
let db = require("../config/database");

let ProductColor = db.define("product_colors", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    timestamps: false,
});


module.exports = ProductColor;