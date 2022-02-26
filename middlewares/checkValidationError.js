let { validationResult } = require("express-validator");

let checkValidationError = (req, res, next) => {
    let validationResultArray = validationResult(req).array();
    if (validationResultArray.length === 0) 
        return next();
    res.status(400).json({
        success: false,
        message: "validation error",
        validationError: validationResultArray
    });
}

module.exports = checkValidationError;