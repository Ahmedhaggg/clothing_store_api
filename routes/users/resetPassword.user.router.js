let router = require("express").Router();
let userResetPasswordValidation = require("../../validation/users/resetPassword.user.validation");
let userResetPasswordController = require("../../controller/users/resetPassword.user.controller");
let checkValidationError = require("../../middlewares/checkValidationError");

router.post("/", 
    userResetPasswordValidation.validate("resetPassword"),
    checkValidationError,
    userResetPasswordController.create
);

router.get("/:token", 
    userResetPasswordController.verifiy
);

router.put("/", 
    userResetPasswordValidation.validate("updatePassword"),
    checkValidationError,
    userResetPasswordController.update
);

module.exports = router;