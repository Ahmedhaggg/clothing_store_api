let router = require("express").Router();
let subcategoryAdminController = require("../../controllers/admin/subcategory.admin.controller");
let subcategoryAdminValidation = require("../../validation/admin/subcategory.admin.validation");
let checkValidationError = require("../../middlewares/checkValidationError");
let use = require("../../middlewares/useMiddleware");
let guards = require("../../middlewares/guards");

router.get("/", 
    guards.isAdmin,
    use(subcategoryAdminController.index)
);

router.post("/", 
    guards.isAdmin,
    subcategoryAdminValidation.validate("create"),
    checkValidationError,
    use(subcategoryAdminController.store)
);

router.get("/:id", 
    guards.isAdmin,
    use(subcategoryAdminController.show)
)

router.put("/:id", 
    guards.isAdmin,
    subcategoryAdminValidation.validate("update"),
    checkValidationError,
    use(subcategoryAdminController.update)
);

module.exports = router;