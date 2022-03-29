let router = require("express").Router();
let adminGovernorateController = require("../../controllers/admin/governorate.admin.controller");

router.post("/", adminGovernorateController.store);

router.get("/:id", adminGovernorateController.show);

module.exports = router;