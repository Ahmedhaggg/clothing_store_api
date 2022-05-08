let router = require("express").Router();
let userResetPasswordValidation = require("../../validation/users/resetPassword.user.validation");
let userResetPasswordController = require("../../controllers/users/resetPassword.user.controller");
let checkValidationError = require("../../middlewares/checkValidationError");
let use = require("../../middlewares/useMiddleware");
let guards = require("../../middlewares/guards");

router.post("/", 
    guards.isUser,
    userResetPasswordValidation.validate("createResetPassword"),
    checkValidationError,
    use(userResetPasswordController.create)
);

router.get("/:token", 
    guards.isUser,
    use(userResetPasswordController.verify)
);

router.put("/:resetPasswordToken", 
    guards.isUser,
    userResetPasswordValidation.validate("updatePassword"),
    checkValidationError,
    use(userResetPasswordController.update)
);

module.exports = router;