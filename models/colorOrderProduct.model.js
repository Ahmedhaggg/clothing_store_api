const { DataTypes } = require("sequelize");
let db = require("../config/database");

let OrderProductColor = db.define("order_products_colors", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    quantity: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
}, {
    timestamps: false
});


module.exports = OrderProductColor;