const { DataTypes } = require("sequelize");
let db = require("../config/database");

let EmailVerification = db.define("email_verification", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    expiresin: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

module.exports = EmailVerification;