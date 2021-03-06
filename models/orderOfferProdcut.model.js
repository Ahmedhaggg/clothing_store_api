const { DataTypes } = require("sequelize");
let db = require("../config/database");

let OrderOfferProduct = db.define("order_offer_products", {
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


module.exports = OrderOfferProduct;