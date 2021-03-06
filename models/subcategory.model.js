const { DataTypes } = require("sequelize");
let db = require("../config/database");

let Subcategory = db.define("subcategories", {
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


module.exports = Subcategory;