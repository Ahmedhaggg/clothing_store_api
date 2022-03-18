let router = require("express").Router();
let userAuthValidation = require("../../validation/users/auth.user.validation");
let userAuthController = require("../../controllers/users/auth.user.controller");
let checkValidationError = require("../../middlewares/checkValidationError");

router.post("/register", 
    userAuthValidation.validate("register"),
    checkValidationError,
    userAuthController.register
);

router.post("/login", 
    userAuthValidation.validate("login"),
    checkValidationError,
    userAuthController.login
);

router.post("/verify", 
    userAuthController.validate("verifyEmail"),
    checkValidationError,
    userAuthController.verify
);

module.exports = router;