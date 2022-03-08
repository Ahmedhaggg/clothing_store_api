const { DataTypes } = require("sequelize");
let db = require("../config/database");

let ResetPassword = db.define("reset_password", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    token: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    expiresin: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

module.exports = ResetPassword;