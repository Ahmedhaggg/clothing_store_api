let { check } = require("express-validator");


let isFile = (field) => 
    check(field).custom((value, {req}) => {
        if (!req.file)
            throw new Error(`${field} is not found`);
        
        return true;
    })

module.exports = isFile;