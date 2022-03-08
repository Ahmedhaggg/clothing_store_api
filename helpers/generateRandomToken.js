let crypto = require("crypto");
let generateRandomToken = () => crypto.randomBytes(32).toString("hex");

module.exports = generateRandomToken;
