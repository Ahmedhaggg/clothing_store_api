const { DataTypes } = require("sequelize");
let db = require("../config/database");

let Shipping = db.define("shipping", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    startShippingAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endShippingWithin: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = Shipping;