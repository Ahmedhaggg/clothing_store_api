let router = require("express").Router();
let userAuthValidation = require("../../validation/users/auth.user.validation");
let userAuthController = require("../../controllers/users/auth.user.controller");
let checkValidationError = require("../../middlewares/checkValidationError");
let use = require("../../middlewares/useMiddleware");
let guards = require("../../middlewares/guards");
router.post("/register", 
    userAuthValidation.validate("register"),
    checkValidationError,
    use(userAuthController.register)
);

router.post("/login", 
    userAuthValidation.validate("login"),
    checkValidationError,
    use(userAuthController.login)
);

router.post("/verify", 
    userAuthValidation.validate("verifyEmail"),
    checkValidationError,
    use(userAuthController.verify)
);

module.exports = router;