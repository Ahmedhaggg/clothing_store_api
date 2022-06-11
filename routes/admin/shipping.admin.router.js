let router = require("express").Router();
let guards = require("../../middlewares/guards");
let use = require("../../middlewares/useMiddleware");
let adminShippingController = require("../../controllers/admin/shipping.admin.controller");

router.get("/count", 
    guards.isAdmin,
    use(adminShippingController.count)
);

router.get("", 
    guards.isAdmin,
    use(adminShippingController.index)
);

router.get("/:id", 
    guards.isAdmin,
    use(adminShippingController.show)
);

module.exports = router;