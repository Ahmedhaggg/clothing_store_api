const { DataTypes } = require("sequelize");
let db = require("../config/database");

let OfferProducts = db.define("offer_products", {
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


module.exports = OfferProducts;