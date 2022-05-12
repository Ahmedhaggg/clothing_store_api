let router = require("express").Router();
let use = require("../../middlewares/useMiddleware");
let userOrderController = require("../../controllers/users/order.user.controller");
let userOrderValidation = require("../../validation/users/order.user.validation");
let guards = require("../../middlewares/guards");
let checkValidationError = require("../../middlewares/checkValidationError")

router.get("/", 
    guards.isUser,    
    use(userOrderController.index)    
);


router.get("/:id",
    guards.isUser,
    use(userOrderController.show)
);

router.post("/", 
    guards.isUser,
    userOrderValidation.validate("create"),
    checkValidationError,
    use(userOrderController.store)
);

module.exports = router;