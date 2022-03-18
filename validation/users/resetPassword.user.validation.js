let { check } = require("express-validator");
let passwordIsConfirmed = require("../custom/passwordIsConfirmed")

exports.validate = (action) => {
    switch (action) {
        case "createResetPassword":
            return [
                check("email").not().isEmpty().withMessage("can't be empty")
                    .isEmail().withMessage("should be email"),
                check("frontUrl").not().isEmpty().withMessage("can't be empty")
            ];
        case "updatePassword":
            return [
                check("newPassword").not().isEmpty().withMessage("can't be empty")
                    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
                passwordIsConfirmed("newPassword")
            ];
        default:
            throw new Error("something went wrong");
    }
}