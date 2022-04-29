let { check } = require("express-validator");


let isArray = (field, length = null) => 
    check(field).custom((value, { req } ) => {
        if (!Array.isArray(value))
            throw new Error(`${field} is can't array`)
        
        if (!length)
            return true;
            
        if(length.min) {
            if (value.length < length.min) 
                throw new Error(`${field} minMum is ${length.min}`)
        } 

        if (length.max) {
            if (value.length > length.max)
                throw new Error(`${field} maxMum is ${length.max}`)
        }
        
        return true
    })

module.exports = isArray;