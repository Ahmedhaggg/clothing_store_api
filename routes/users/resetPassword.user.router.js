let router = require("express").Router();
let userResetPasswordValidation = require("../../validation/users/resetPassword.user.validation");
let userResetPasswordController = require("../../controllers/users/resetPassword.user.controller");
let checkValidationError = require("../../middlewares/checkValidationError");
let use = require("../../middlewares/useMiddleware");

router.post("/", 
    userResetPasswordValidation.validate("createResetPassword"),
    checkValidationError,
    use(userResetPasswordController.create)
);

router.get("/:token", 
    use(userResetPasswordController.verify)
);

router.put("/", 
    userResetPasswordValidation.validate("updatePassword"),
    checkValidationError,
    userResetPasswordController.update
);

module.exports = router;