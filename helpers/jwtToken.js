let jwt = require("jsonwebtoken");
let { JWT_SECRET } = require("../config/index");
exports.createJwtToken = async (data, expire) => {
    try {
        let token = await jwt.sign(data, JWT_SECRET, { expiresIn: expire});

        return token;
    } catch (error) {
        throw new Error("something went wrong")
    }
} 