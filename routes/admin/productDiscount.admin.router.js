let router = require("express").Router();
let adminProductDiscountController = require("../../controllers/admin/productDiscount.admin.controller");
let adminProductDiscountValidation = require("../../validation/admin/productDiscount.admin.validation");
let use = require("../../middlewares/useMiddleware");
let guards = require("../../middlewares/guards");

router.get("/:discountId", 
    guards.isAdmin,
    use(adminProductDiscountController.show)
);

router.post("/",
    guards.isAdmin,
    adminProductDiscountValidation.validate("create"),
    use(adminProductDiscountController.create)
);

router.put("/:discountId", 
    guards.isAdmin,
    adminProductDiscountValidation.validate("update"),
    use(adminProductDiscountController.update)
);

router.delete("/:discountId",
    guards.isAdmin,
    use(adminProductDiscountController.destroy)
);

module.exports = router;