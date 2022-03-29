let router = require("express").Router();
let adminOfferProductController = require("../../controllers/admin/offerProduct.admin.controller");

router.pos("/", 
    adminOfferProductController.store
)
router.put("/:id", 
    adminOfferProductController.update
);

router.delete("/:id", 
    adminOfferProductController.destroy
);

module.exports = router;