const { DataTypes } = require("sequelize");

let Sales = db.define("sales", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false
    }
}, {
    timestamps: true
});


module.exports = Governorate;