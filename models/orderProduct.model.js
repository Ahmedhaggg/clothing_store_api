const { DataTypes } = require("sequelize");
let db = require("../config/database");

let OrderProduct = db.define("order_products", {
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
    colors: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false
    },
    pricePerUnit: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    } 
}, {
    timestamps: false
});


module.exports = OrderProduct;