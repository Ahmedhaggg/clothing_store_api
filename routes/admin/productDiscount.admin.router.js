let router = require("express").Router();
let adminProductDiscountController = require("../../controllers/admin/productDiscount.admin.controller");
let adminProductDiscountValidation = require("../../validation/admin/productDiscount.admin.validation");
let use = require("../../middlewares/useMiddleware");

router.post("/", 
    adminProductDiscountValidation.validate("addDiscount"),
    use(adminProductDiscountController.create)
);

router.put("/:id", 
    adminProductDiscountValidation.validate("updateDiscount"),
    use(adminProductDiscountController.update)
);

router.delete("/:id",
    use(adminProductDiscountController.destroy)
);

module.exports = router;