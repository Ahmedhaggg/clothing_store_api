let router = require("express").Router();
let adminOfferController = require("../../controllers/admin/offer.admin.controller")
// let adminOfferValidation = require("../../validation/admin/offer.admin.validation")

router.get("/", 
    adminOfferController.index,
)

router.post("/",
    // adminOfferValidation.validate("addOffer"),
    adminOfferController.store
)

router.get("/:id", 
    adminOfferController.show
)

router.put("/:id", 
    // adminOfferValidation.validate("updateOffer"),
    adminOfferController.update
)

router.post("/active", 
    // adminOfferValidation.validate("active"),
    adminOfferController.active
)

router.post("/unactive", 
    // adminOfferValidation.validate("unactive"),
    adminOfferController.unactive
)

module.exports = router;