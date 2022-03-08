let router = require("express").Router();
let categoryAdminController = require("../../controllers/admin/category.admin.controller");
let categoryAdminValidation = require("../../validation/admin/category.admin.validation");
let checkValidationError = require("../../middlewares/checkValidationError");
let use = require("../../middlewares/useMiddleware");

router.get("/", 
    use(categoryAdminController.index)
);

router.post("/", 
    categoryAdminValidation.validate("addCategory"),
    checkValidationError,
    use(categoryAdminController.store)
);

router.get("/:id", 
    use(categoryAdminController.show)
);

router.get("/:id/subcategoriesNames", 
    use(categoryAdminController.getSubcategoriesName)
);

router.put("/:id", 
    categoryAdminValidation.validate("updateCategory"),
    checkValidationError,
    use(categoryAdminController.update)
);

module.exports = router;