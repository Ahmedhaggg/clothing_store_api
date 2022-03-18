let router = require("express").Router();
let subcategoryAdminController = require("../../controllers/admin/subcategory.admin.controller");
let subcategoryAdminValidation = require("../../validation/admin/subcategory.admin.validation");
let checkValidationError = require("../../middlewares/checkValidationError");
let use = require("../../middlewares/useMiddleware");

router.get("/", 
    use(subcategoryAdminController.index)
);

router.post("/", 
    subcategoryAdminValidation.validate("addSubcategory"),
    checkValidationError,
    use(subcategoryAdminController.store)
);

router.put("/:id", 
    subcategoryAdminValidation.validate("updateSubcategory"),
    checkValidationError,
    use(subcategoryAdminController.update)
);

module.exports = router;