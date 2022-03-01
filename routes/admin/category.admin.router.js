let router = require("express").Router();
let categoryAdminController = require("../../controllers/admin/category.admin.controller");
let categoryAdminValidation = require("../../validation/admin/category.admin.validation");
let checkValidationError = require("../../middlewares/checkValidationError");
let use = require("../../middlewares/useMiddleware");
router.post("/", 
    categoryAdminValidation.validate("addCategory"),
    checkValidationError,
    use(categoryAdminController.store)
)



module.exports = router;