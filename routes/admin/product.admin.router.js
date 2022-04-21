let router = require("express").Router();
let uploader = require("../../middlewares/uploader");
let checkValidationError = require("../../middlewares/checkValidationError");
let adminProductController = require("../../controllers/admin/product.admin.controller");
let adminProductValidation = require("../../validation/admin/product.admin.validation");
let guards = require("../../middlewares/guards");
let use = require("../../middlewares/useMiddleware");
router.get("/", 
    guards.isAdmin,
    use(adminProductController.index)
);

router.post("/", 
    guards.isAdmin,
    uploader.uploadFile("image"),
    adminProductValidation.validate("addProduct"),
    checkValidationError,
    use(adminProductController.store)
);

// not implemented
router.get("/:id", 
    guards.isAdmin,
    use(adminProductController.show)
);

router.put("/:id", 
    guards.isAdmin,
    adminProductValidation.validate("updateProduct"),
    checkValidationError,
    use(adminProductController.update)
);

router.put("/:id/image", 
    guards.isAdmin,
    uploader.uploadFile("image"),
    adminProductValidation.validate("updateProductImage"),
    use(adminProductController.updateProductImage)
);

router.put("/:id/active",
    guards.isAdmin,
    use(adminProductController.active)
);

router.put("/:id/unactive",
    guards.isAdmin,
    use(adminProductController.unactive)
);

module.exports = router;