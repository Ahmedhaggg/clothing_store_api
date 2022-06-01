let router = require("express").Router();
let guards = require("../../middlewares/guards");
let use = require("../../middlewares/useMiddleware");
let adminUsersController = require("../../controllers/admin/user.admin.controller");


router.get("/", 
    guards.isAdmin,
    use(adminUsersController.index)
);
router.get("/:id", 
    guards.isAdmin,
    use(adminUsersController.show)
);

router.delete("/:id", 
    guards.isAdmin,
    use(adminUsersController.destroy)
)

module.exports = router;