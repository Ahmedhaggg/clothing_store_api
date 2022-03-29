let router = require("express").Router();
let adminCityController = require("../../controllers/admin/city.admin.controller");

router.post("/", adminCityController.store);

router.get("/:id", adminCityController.show);

router.put("/:id", adminCityController.update);

module.exports = router;