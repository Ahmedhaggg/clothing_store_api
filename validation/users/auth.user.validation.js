let { check } = require("express-validator");
let isUnique = require("../custom/unique");
let passwordIsConfirmed = require("../custom/passwordIsConfirmed")
exports.validate = (action) => {
    switch (action) {
        case "register":
            return [
                check("firstName").not().isEmpty().withMessage("can't be empty"),
                check("lastName").not().isEmpty().withMessage("can't be empty"),
                check("userName").not().isEmpty().withMessage("can't be empty"),
                check("email").not().isEmpty().withMessage("can't be empty")
                    .isEmail().withMessage("should be email"),
                check("password").not().isEmpty().withMessage("can't be empty")
                    .isLength({ min: 8 })
                    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,),
                check("birthDay").not().isEmpty().withMessage("can't be empty"),
                check("gender").not().isEmpty().withMessage("can't be empty"),
                check("phoneNumber").not().isEmpty().withMessage("can't be empty"),
                passwordIsConfirmed("password")
            ];
        case "login": 
            return [
                check("email").not().isEmpty().withMessage("can't be empty")
                    .isEmail().withMessage("should be email"),
                check("password").not().isEmpty().withMessage("can't be empty")
            ];
        case "verifyEmail": 
            return [
                check("code").not().isEmpty().withMessage("can't be empty")
                .isInt()
                .isLength({min: 6, max: 6})
            ];
        default:
            throw new Error("something went wrong");
    }
}