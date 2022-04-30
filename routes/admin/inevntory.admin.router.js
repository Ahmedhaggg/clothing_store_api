let router = require("express").Router();
let adminInventoryController = require("../../controllers/admin/inventory.admin.controller");
let adminInventoryValidation = require("../../validation/admin/inventory.admin.validation");
let guards = require("../../middlewares/guards");
const checkValidationError = require("../../middlewares/checkValidationError");
let use = require("../../middlewares/useMiddleware")
router.put("/:id", 
    guards.isAdmin,
    adminInventoryValidation.validate("update"),
    checkValidationError,
    use(adminInventoryController.update)
);


module.exports = router;