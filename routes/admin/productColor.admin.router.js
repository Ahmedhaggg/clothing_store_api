let router = require("express").Router();
let adminProductColorsController = require("../../controllers/admin/productColors.admin.controller"); 
let adminProductColorsValidation = require("../../validation/admin/productColors.admin.validation");
let checkValidationResult = require("../../middlewares/checkValidationError");
let use = require("../../middlewares/useMiddleware");
let guards = require("../../middlewares/guards");

router.get("/:productId/colors", 
    guards.isAdmin,
    use(adminProductColorsController.index)
);
 
router.post("/colors", 
    guards.isAdmin,
    adminProductColorsValidation.validate("create"),
    checkValidationResult,
    use(adminProductColorsController.create)
);


module.exports = router;