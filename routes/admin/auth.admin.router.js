let router = require("express").Router();
let adminAuthController = require("../../controllers/admin/auth.admin.controller");
let adminAuthValidation = require("../../validation/admin/auth.admin.validation");
let use = require("../../middlewares/useMiddleware");

router.post("/login", 
    adminAuthValidation.validate("login"),
    adminAuthController.login
);

router.post("/register", 
    use(adminAuthController.register)
);

module.exports = router;