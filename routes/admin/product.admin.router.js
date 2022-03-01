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

router.get("/:id", 
    use(adminProductController.show)
);

router.put("/", 
    // adminProductValidation.validate("updateProduct"),
    checkValidationError,
    use(adminProductController.update)
);

router.put("/image/:id", 
    uploader.uploadFile("product_image"),
    // adminProductValidation.validate("updateProductImage"),
    use(adminProductController.updateImage)
);
router.delete("/:id",
    use(adminProductController.destroy)
);

module.exports = router;