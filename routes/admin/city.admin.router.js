let router = require("express").Router();
let adminCityController = require("../../controllers/admin/city.admin.controller");
let use = require("../../middlewares/useMiddleware");

router.post("/", 
    use(adminCityController.store)
);

router.get("/:id", 
    use(adminCityController.show)
);

router.put("/:id", 
    use(adminCityController.update)
);

module.exports = router;