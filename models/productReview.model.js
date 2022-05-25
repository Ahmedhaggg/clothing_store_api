const db = require("../config/database")
const { DataTypes } = require("sequelize");


const ProductReview = db.define("product_reviews", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    ratings: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = ProductReview;