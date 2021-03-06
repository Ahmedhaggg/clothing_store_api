const { DataTypes } = require("sequelize");
let db = require("../config/database");

let Product = db.define("products", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(4,2),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
}, {
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["name"]
        }
    ]
});


module.exports = Product;