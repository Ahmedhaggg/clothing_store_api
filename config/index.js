let path = require("path");
let env = require("dotenv");
env.config();

let ROOT = path.dirname(__dirname);
let UPLOADSDIR = path.join( path.dirname(__dirname), "productsImages")
let OFFERSIMAGESDIR = path.join( path.dirname(__dirname), "offersImages")

let { 
    PORT,
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB,
    BCRYPT_SALT,
    JWT_SECRET,
    EMAIL,
    EMAIL_PASS,
    EMAIL_SERVICE,
    STRIPE_KEY,
    CLIENT_URL
} = process.env;


module.exports =  {
    PORT,
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB,
    BCRYPT_SALT,
    JWT_SECRET,
    ROOT,
    UPLOADSDIR,
    EMAIL,
    EMAIL_PASS,
    EMAIL_SERVICE,
    STRIPE_KEY,
    OFFERSIMAGESDIR,
    CLIENT_URL
};