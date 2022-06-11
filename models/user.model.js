const { DataTypes } = require("sequelize");
let db = require("../config/database");

let User = db.define("users", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM,
        values: ["male", "female"],
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
    },
    birthDay: {
        type: DataTypes.DATE,
        allowNull: false
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    verified_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: false,
    unique: ["email", "userName", "phoneNumber"]
});


module.exports = User;