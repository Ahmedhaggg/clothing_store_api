let router = require("express").Router();
let uploader = require("../../middlewares/uploader");
let checkValidationError = require("../../middlewares/checkValidationError");
let adminProductController = require("../../controllers/admin/product.admin.controller");
let adminProductValidation = require("../../validation/admin/product.admin.validation");
let use = require("../../middlewares/useMiddleware");
router.get("/", 
    use(adminProductController.index)
);

router.post("/", 
    uploader.uploadFile("image"),
    adminProductValidation.validate("addProduct"),
    checkValidationError,
    use(adminProductController.store)
);

// not implemented
router.get("/:id", 
    use(adminProductController.show)
);

router.put("/:productId", 
    adminProductValidation.validate("updateProduct"),
    checkValidationError,
    use(adminProductController.update)
);

router.put("/image/:productId", 
    uploader.uploadFile("image"),
    adminProductValidation.validate("updateProductImage"),
    use(adminProductController.updateProductImage)
);

router.put("/active/:productId",
    use(adminProductController.active)
);

router.put("/unactive/:productId",
    use(adminProductController.unactive)
);

module.exports = router;