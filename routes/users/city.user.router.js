let router = require("express").Router();
let usercityController = require("../../controllers/users/city.user.controller");
let use = require("../../middlewares/useMiddleware");
let guards = require("../../middlewares/guards");

router.get("/:id", 
    guards.isUser,
    use(usercityController.show)
);

module.exports = router