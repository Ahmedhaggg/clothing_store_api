let router = require("express").Router();
let profileUserController = require("../../controllers/users/profile.user.controller")
let use = require("../../middlewares/useMiddleware");
let guards = require("../../middlewares/guards");

router.get("/:id/profile", 
    guards.isUser,
    use(profileUserController.show)
);

module.exports = router;