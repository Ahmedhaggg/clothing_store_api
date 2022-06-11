let router = require("express").Router();
let adminSalesController = require("../../controllers/admin/sales.admin.controller");
let adminSalesValidation = require("../../validation/admin/sales.admin.validation");
let guards = require("../../middlewares/guards");
let use = require("../../middlewares/useMiddleware");
let checkValidationError = require("../../middlewares/checkValidationError");

router.get("/count", 
    guards.isAdmin,
    use(adminSalesController.count)
);

router.get("/", 
    guards.isAdmin,
    use(adminSalesController.index)
);

router.post("/", 
    guards.isAdmin,
    adminSalesValidation.validate("create"),
    checkValidationError,
    use(adminSalesController.store)
);

router.get("/:id", 
    guards.isAdmin,
    use(adminSalesController.show)
);

module.exports = router;