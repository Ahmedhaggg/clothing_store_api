let router = require("express").Router();
let categoryAdminController = require("../../controllers/admin/category.admin.controller");
let categoryAdminValidation = require("../../validation/admin/category.admin.validation");
let checkValidationError = require("../../middlewares/checkValidationError");
let use = require("../../middlewares/useMiddleware");
let guards = require("../../middlewares/guards");


router.get("/", 
    guards.isAdmin,
    use(categoryAdminController.index)
);

router.post("/", 
    guards.isAdmin,
    categoryAdminValidation.validate("create"),
    checkValidationError,
    use(categoryAdminController.store)
);

router.get("/:id", 
    guards.isAdmin,
    use(categoryAdminController.show)
);


router.put("/:id", 
    guards.isAdmin,
    categoryAdminValidation.validate("update"),
    checkValidationError,
    use(categoryAdminController.update)
);

module.exports = router;