let router = require("express").Router();
let adminProductColorsController = require("../../controllers/admin/productColors.admin.controller"); 
let adminProductColorsValidation = require("../../validation/admin/productColors.admin.validation");

router.get("/:productId", 
    adminProductColorsController.show
);
 
router.post("/", 
    adminProductColorsValidation.validate("createProductColor"),
    adminProductColorsController.create
);

router.put("/:colorId",     
    adminProductColorsValidation.validate("updateProductColor"),
    adminProductColorsController.update
);

router.delete("/:colorId", 
    adminProductColorsController.destroy
)

module.exports = router;