const { Sequelize } = require("sequelize");
let config = require("./index");

const db = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
    host: config.DB_HOST,
    dialect: "mysql",
    dialectOptions: {
        decimalNumbers: true
    }
});


module.exports = db;