let { check } = require("express-validator");

let passwordIsConfirmed = 
    check("confirmPassword")
        .custom((value, { req }) => {
            if (req.body.password !== req.body.confirmPassword)
                throw new Error("confirm password is differante about password");
            return true
        });


module.exports = passwordIsConfirmed;