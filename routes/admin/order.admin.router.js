let router = require("express").Router();
let adminOrderController = require("../../controllers/admin/order.admin.controller");
let adminOrderValidation = require("../../validation/admin/order.admin.validation");
let checkValidationError = require("../../middlewares/checkValidationError")
let guards = require("../../middlewares/guards");
let use = require("../../middlewares/useMiddleware");
 
router.get("/count", 
    guards.isAdmin,
    use(adminOrderController.count)
);

router.get("/", 
    guards.isAdmin,
    use(adminOrderController.index)
);

router.get("/:id", 
    guards.isAdmin,
    use(adminOrderController.show)
);

router.put("/:id", 
    guards.isAdmin,
    adminOrderValidation.validate("update"),
    checkValidationError,
    use(adminOrderController.update)
);

module.exports = router;