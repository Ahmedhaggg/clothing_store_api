let router = require("express").Router();
let userOfferReviewController = require("../../controllers/users/OfferReview.user.controller");
let userOfferReviewValidation = require("../../validation/users/offerReview.user.validation");
let guards = require("../../middlewares/guards");
let use = require("../../middlewares/useMiddleware");

router.get("/:offerId/reviews", 
    guards.isUser,
    use(userOfferReviewController.index)
);

router.get("/:offerId/reviews/:reviewId", 
    guards.isUser,
    use(userOfferReviewController.show)
);

router.post("/:offerId/reviews", 
    guards.isUser,
    userOfferReviewValidation.validate("create"),
    use(userOfferReviewController.store)
);

router.put("/:offerId/reviews/:reviewId", 
    guards.isUser,
    userOfferReviewValidation.validate("update"),
    use(userOfferReviewController.update)
);

router.delete("/:offerId/reviews/:reviewId", 
    guards.isUser,
    use(userOfferReviewController.destroy)
);

module.exports = router;