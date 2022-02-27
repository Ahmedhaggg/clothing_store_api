const { DataTypes } = require("sequelize");
let db = require("../config/database");

let Product = db.define("products", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING(100),
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
        type: DataTypes.STRING(70),
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