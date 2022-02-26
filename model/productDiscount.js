const { DataTypes } = require("sequelize");
let db = require("../config/database");

let ProductDiscount = db.define("products_discount", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    percent: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    expiresin: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: true
});


module.exports = ProductDiscount;