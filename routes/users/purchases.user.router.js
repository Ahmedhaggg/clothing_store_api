let router = require("express").Router();
let userPurchasesController = require("../../controllers/users/purchases.user.controller")
let guards = require("../../middlewares/guards");
let use = require("../../middlewares/useMiddleware");

router.get("/", 
    guards.isUser,
    use(userPurchasesController.index)
);

router.get("/:id", 
    guards.isUser,
    use(userPurchasesController.show)
);

module.exports = router;