let router = require("express").Router();
let guards = require("../../middlewares/guards");
let checkValidationError = require("../../middlewares/checkValidationError")
let use = require("../../middlewares/useMiddleware");
let adminShipperController = require("../../controllers/admin/shipper.admin.controller");
let adminShipperValidation = require("../../validation/admin/shipper.admin.validation");

router.get("/", 
    guards.isAdmin,
    use(adminShipperController.index)
);

router.post("/",
    guards.isAdmin,
    adminShipperValidation.validate("create"),
    checkValidationError,
    use(adminShipperController.store)
);

router.get("/:id", 
    guards.isAdmin,
    use(adminShipperController.show)
);

module.exports = router;