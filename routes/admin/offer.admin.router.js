let router = require("express").Router();
let adminOfferController = require("../../controllers/admin/offer.admin.controller")
let adminOfferValidation = require("../../validation/admin/offer.admin.validation")
let guards = require("../../middlewares/guards");
let use = require("../../middlewares/useMiddleware");
let uploader = require("../../middlewares/uploader");
const checkValidationError = require("../../middlewares/checkValidationError");
router.get("/", 
    guards.isAdmin,
    use(adminOfferController.index)
)

router.post("/",
    uploader.uploadFile("image", "offersImages"),
    guards.isAdmin,
    adminOfferValidation.validate("create"),
    checkValidationError,
    use(adminOfferController.store)
)

router.get("/:id", 
    guards.isAdmin,
    use(adminOfferController.show)
)

router.put("/:id", 
    guards.isAdmin,
    adminOfferValidation.validate("update"),
    checkValidationError,
    use(adminOfferController.update)
)

router.put("/:id/image", 
    uploader.uploadFile("image", "offersImages"),
    guards.isAdmin,
    adminOfferValidation.validate("updateImage"),
    checkValidationError,
    use(adminOfferController.updateImage)
)

router.put("/:id/active", 
    guards.isAdmin,
    use(adminOfferController.active)
)

router.put("/:id/unactive", 
    guards.isAdmin,
    use(adminOfferController.unactive)
)

module.exports = router;