let router = require("express").Router();
let adminOrderController = require("../../controllers/admin/order.admin.controller");
let guards = require("../../middlewares/guards");
let use = require("../../middlewares/useMiddleware");

router.get("/", 
    guards.isAdmin,
    use(adminOrderController.index)
);

router.get("/:id", 
    guards.isAdmin,
    use(adminOrderController.show)
);

router.put("/:id", 
    guards.isAdmin,
    use(adminOrderController.update)
);

module.exports = router;