let router = require("express").Router();
let userGovernorateController = require("../../controllers/users/governorate.user.controller")
let use = require("../../middlewares/useMiddleware")
let guards = require("../../middlewares/guards");

router.get("/", 
    guards.isUser,
    use(userGovernorateController.index)
);

router.get("/:id", 
    guards.isUser,
    use(userGovernorateController.show)
);

module.exports = router;