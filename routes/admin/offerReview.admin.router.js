let router = require("express").Router();
let adminOfferReviewController = require("../../controllers/admin/offerReview.admin.controller");
let use = require("../../middlewares/useMiddleware");
let guards = require("../../middlewares/guards");

router.get("/offers/reviews/count", 
    guards.isAdmin,
    use(adminOfferReviewController.count)
);

router.get("/offers/:offerId/reviews", 
    guards.isAdmin,
    use(adminOfferReviewController.index)
);

router.get("/offers/reviews/:reviewId", 
    guards.isAdmin,
    use(adminOfferReviewController.show)
);

module.exports = router;