let router = require("express").Router();
let adminOfferProductController = require("../../controllers/admin/offerProduct.admin.controller");
let adminOfferProductValidation = require("../../validation/admin/offerProduct.admin.validation")
let guards = require("../../middlewares/guards");
const checkValidationError = require("../../middlewares/checkValidationError");
let use = require("../../middlewares/useMiddleware")
router.post("/", 
    guards.isAdmin,
    adminOfferProductValidation.validate("create"),
    checkValidationError,
    use(adminOfferProductController.store)
)
router.put("/:id", 
    guards.isAdmin,
    adminOfferProductValidation.validate("update"),
    checkValidationError,
    use(adminOfferProductController.update)
);

router.delete("/:id", 
    guards.isAdmin,
    use(adminOfferProductController.destroy)
);

module.exports = router;