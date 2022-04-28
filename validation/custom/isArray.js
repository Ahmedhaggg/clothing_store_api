let { check } = require("express-validator");


let isArray = (field, length = null) => 
    check(field).custom((value, { req } ) => {
        let array = JSON.parse(req.body[field]);
        
        if (!Array.isArray(array))
            throw new Error(`${field} is can't array`)
        
        if (!length)
            return true;
            
        if(length.min) {
            if (array.length < length.min) 
                throw new Error(`${field} minMum is ${length.min}`)
        } 

        if (length.max) {
            if (array.length > length.max)
                throw new Error(`${field} maxMum is ${length.max}`)
        }
        
        return true
    })

module.exports = isArray;