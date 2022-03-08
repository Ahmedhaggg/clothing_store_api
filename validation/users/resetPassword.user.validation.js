let { check } = require("express-validator");
let passwordIsConfirmed = require("../custom/passwordIsConfirmed")

exports.validate = (action) => {
    switch (action) {
        case "resetPassword":
            return [
                check("email").not().isEmpty().withMessage("can't be empty")
                    .isEmail().withMessage("should be email")
            ];
        case "updatePassword":
            return [
                check("email").not().isEmpty().withMessage("can't be empty")
                    .isEmail().withMessage("should be email"),
                check("password").not().isEmpty().withMessage("can't be empty")
                    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
                passwordIsConfirmed()
            ];
        default:
            throw new Error("something went wrong");
    }
}