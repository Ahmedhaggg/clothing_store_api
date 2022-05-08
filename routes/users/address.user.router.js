let router = require("express").Router();
let userAddressController = require("../../controllers/users/address.user.controller");
let userAddressValidation = require("../../validation/users/address.user.validation");
let use = require("../../middlewares/useMiddleware");
let guards = require("../../middlewares/guards");
const checkValidationError = require("../../middlewares/checkValidationError");

router.get("/", 
    guards.isUser,
    use(userAddressController.index)
); 

router.post("/", 
    guards.isUser,
    userAddressValidation.validate("create"),
    checkValidationError,
    use(userAddressController.store)
);

router.get("/:id", 
    guards.isUser,
    use(userAddressController.show)
);

router.put("/:id",
    guards.isUser,
    userAddressValidation.validate("update"),
    checkValidationError,
    use(userAddressController.update)
);

module.exports = router;