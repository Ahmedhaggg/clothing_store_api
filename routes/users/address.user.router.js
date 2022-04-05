let router = require("express").Router();
let userAddressController = require("../../controllers/admin/governorate.admin.controller");
let use = require("../../middlewares/useMiddleware");
let guards = require("../../middlewares/guards");

router.get("/", 
    guards.isUser,
    use(userAddressController.index)
);

router.post("/", 
    guards.isUser,
    use(userAddressController.store)
);

router.get("/:id", 
    guards.isUser,
    use(userAddressController.show)
);

router.put("/:id",
    guards.isUser,
    use(userAddressController.update)
);

module.exports = router;