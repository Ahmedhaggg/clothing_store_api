let router = require("express").Router();
let adminCityController = require("../../controllers/admin/city.admin.controller");
let adminCityValidation = require("../../validation/admin/city.admin.validation")
let use = require("../../middlewares/useMiddleware");
let guards = require("../../middlewares/guards");
const checkValidationError = require("../../middlewares/checkValidationError");

router.get("/", 
    guards.isAdmin,
    use(adminCityController.index)
)
router.post("/", 
    guards.isAdmin,
    adminCityValidation.validate("create"),
    checkValidationError,
    use(adminCityController.store)
);

router.get("/:id", 
    guards.isAdmin,
    use(adminCityController.show)
);

router.put("/:id", 
    guards.isAdmin,
    adminCityValidation.validate("update"),
    checkValidationError,
    use(adminCityController.update)
);

module.exports = router;