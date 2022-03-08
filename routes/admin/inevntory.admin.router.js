let router = require("express").Router();
let adminInventoryController = require("../../controllers/admin/inventory.admin.controller");
let adminInventoryValidation = require("../../validation/admin/inventory.admin.validation");


router.put("/:id", 
    adminInventoryController.update
);


module.exports = router;