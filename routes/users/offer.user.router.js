let router = require("express").Router();
let use = require("../../middlewares/useMiddleware");
let userOfferController = require("../../controllers/users/offer.user.controller");

router.get("/", 
    use(userOfferController.index)
);

router.get("/:id", 
    use(userOfferController.show)
);

module.exports = router;