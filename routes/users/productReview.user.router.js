let router = require("express").Router();
let userProductReviewController = require("../../controllers/users/productReview.user.controller");
let userProductReviewValidation = require("../../validation/users/productReview.user.validation");
let guards = require("../../middlewares/guards");
let use = require("../../middlewares/useMiddleware");
const checkValidationError = require("../../middlewares/checkValidationError");

router.get("/:productId/reviews", 
    guards.isUser,
    use(userProductReviewController.index)
);

router.get("/:productId/reviews/:reviewId", 
    guards.isUser,
    use(userProductReviewController.show)
);

router.post("/:productId/reviews", 
    guards.isUser,
    userProductReviewValidation.validate("create"),
    checkValidationError,
    use(userProductReviewController.store)
);

router.put("/:productId/reviews/:reviewId", 
    guards.isUser,
    userProductReviewValidation.validate("update"),
    checkValidationError,
    use(userProductReviewController.update)
);

router.delete("/:productId/reviews/:reviewId", 
    guards.isUser,
    use(userProductReviewController.destroy)
);

module.exports = router;