let router = require("express").Router();
let adminGovernorateController = require("../../controllers/admin/governorate.admin.controller");
let adminGovernorateValidation = require("../../validation//admin/governorate.admin.validation");
let guards = require("../../middlewares/guards");
let checkValidationError = require("../../middlewares/checkValidationError");
let use = require("../../middlewares/useMiddleware")

router.get("/", 
    guards.isAdmin,
    use(adminGovernorateController.index)
);

router.post("/", 
    guards.isAdmin,
    adminGovernorateValidation.validate("create"),
    checkValidationError,
    use(adminGovernorateController.store)
);

router.get("/:id", 
    guards.isAdmin,
    use(adminGovernorateController.show)
);

module.exports = router;