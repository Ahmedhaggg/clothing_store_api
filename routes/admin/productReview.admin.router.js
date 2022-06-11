let router = require("express").Router();
let adminProductReviewController = require("../../controllers/admin/productReview.admin.controller");
let use = require("../../middlewares/useMiddleware");
let guards = require("../../middlewares/guards");

router.get("/products/reviews/count", 
    guards.isAdmin,
    use(adminProductReviewController.count)
);


router.get("/products/:productId/reviews", 
    guards.isAdmin,
    use(adminProductReviewController.index)
);

router.get("/products/reviews/:reviewId", 
    guards.isAdmin,
    use(adminProductReviewController.show)
);

module.exports = router;