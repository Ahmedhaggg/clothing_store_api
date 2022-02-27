const { DataTypes } = require("sequelize");
let db = require("../config/database");

let Admin = db.define("admins", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(70),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(120),
        allowNull: false
    }
}, {
    timestamps: false,
    unique: ["email"]
});


module.exports = Admin;