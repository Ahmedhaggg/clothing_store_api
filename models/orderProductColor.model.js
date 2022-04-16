const { DataTypes } = require("sequelize");
let db = require("../config/database");

let OrderProductColor = db.define("order_products_colors", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    size: {
        type: DataTypes.ENUM,
        values: ["sm", "md", "l", "sl", "xl", "xx", "3x"],
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