let bcrypt = require("bcrypt");
let { BCRYPT_SALT } = require("../config/index");
exports.hash = async data => {
    const salt = await bcrypt.genSalt(JSON.parse(BCRYPT_SALT));
    
    let hash = await bcrypt.hash(data, salt);

    return hash;
}
exports.compare = async (data, hashedData) => {
    console.log(data);
    console.log(hashedData);
    let isHashed = await bcrypt.compare(data, hashedData);
    
    return isHashed;
}