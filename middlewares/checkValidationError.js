let { validationResult } = require("express-validator");
let fs = require("fs");
let { UPLOADSDIR } = require("../config/index");
let path = require("path");

let checkValidationError = async (req, res, next) => {
    try {
        let validationResultArray = validationResult(req).array();
        if (validationResultArray.length === 0) 
            return next();
        
        if (req.file)
            await fs.unlinkSync(path.join(req.file.destination,  req.file.filename));
    
        res.status(400).json({
            success: false,
            message: "validation error",
            validationError: validationResultArray
        });
    } catch (_) {
        res.status(500).json({
            success: false,
            message: "something went wrong"
        });
    }
}

module.exports = checkValidationError;