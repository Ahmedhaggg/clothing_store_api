const db = require("../config/database")
const { DataTypes } = require("sequelize");


const OfferReview = db.define("offer_reviews", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    rating: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = OfferReview;