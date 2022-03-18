let { check } = require("express-validator");

let passwordIsConfirmed = field =>
    check("confirmPassword")
        .custom((value, { req }) => {
            if (value !== req.body[field])
                throw new Error("password isn't confirmed");
            return true
        });


module.exports = passwordIsConfirmed;