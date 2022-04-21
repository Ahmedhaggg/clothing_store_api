const { DataTypes } = require("sequelize");
let db = require("../config/database");

let Category = db.define("categories", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    timestamps: true
});


module.exports = Category;