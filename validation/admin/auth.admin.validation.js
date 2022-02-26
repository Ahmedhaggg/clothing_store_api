let { check } = require("express-validator");

exports.validate = (action) => {
    switch (action) {
        case "login":
            return [
                check("email").not().isEmpty().withMessage("can't be empty")
                    .isEmail().withMessage("should be email"),
                check("password").not().isEmpty().withMessage("can't be empty")
            ];
        default:
            throw new Error("something went wrong");
    }
}