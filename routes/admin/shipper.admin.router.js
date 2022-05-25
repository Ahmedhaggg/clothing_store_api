let router = require("express").Router();
let guards = require("../../middlewares/guards");
let use = require("../../middlewares/useMiddleware");
let adminShipperController = require("../../controllers/admin/shipper.admin.controller");

router.post("/",
    guards.isAdmin,
    use(adminShipperController.store)
);

router.get("/", 
    guards.isAdmin,
    use(adminShipperController.index)
);

router.get("/:id", 
    guards.isAdmin,
    use(adminShipperController.show)
);

module.exports = router;