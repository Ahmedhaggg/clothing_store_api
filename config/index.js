let env = require("dotenv");
env.config();
let { 
    PORT,
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB,
    BCRYPT_SALT,
    JWT_SECRET
} = process.env;


module.exports =  {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB,
    BCRYPT_SALT,
    JWT_SECRET
}