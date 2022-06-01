let { check } = require("express-validator");
let passwordIsConfirmed = require("../custom/passwordIsConfirmed")

exports.validate = (action) => {
    switch (action) {
        case "create":
            return [
                check("email").not().isEmpty().withMessage("can't be empty")
                    .isEmail().withMessage("should be email"),
                check("frontUrl").not().isEmpty().withMessage("can't be empty")
            ];
        case "update":
            return [
                check("newPassword").not().isEmpty().withMessage("can't be empty")
                    .isLength({ min: 8 })
                    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,),
                passwordIsConfirmed("newPassword")
            ];
        default:
            throw new Error("something went wrong");
    }
}