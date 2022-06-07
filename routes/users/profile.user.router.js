let router = require("express").Router();
let profileUserController = require("../../controllers/users/profile.user.controller")
let use = require("../../middlewares/useMiddleware");
let guards = require("../../middlewares/guards");

router.get("/:userId/profile", 
    guards.isUser,
    use(profileUserController.showProfile)
); 

router.get("/:userId/products/reviews", 
    guards.isUser,
    use(profileUserController.showProductsReviews)
);

router.get("/:userId/offers/reviews", 
    guards.isUser,
    use(profileUserController.showOffersReviews)
);

module.exports = router;