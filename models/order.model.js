const { DataTypes } = require("sequelize");
let db = require("../config/database");

let Order = db.define("orders", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        values: ["received", "shipped", "completed"],
        defaultValue: "received"
    }, 
    paymentId: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    amount: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    }
}, {
    timestamps: true
});


module.exports = Order;