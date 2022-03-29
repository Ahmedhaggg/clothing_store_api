let router = require("express").Router();
let userAddressController = require("../../controllers/admin/governorate.admin.controller");

router.post("/", userAddressController.store);

router.get("/:id", userAddressController.show);

module.exports = router;