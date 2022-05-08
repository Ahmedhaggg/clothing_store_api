let router = require("express").Router();
let userCategoryController = require("../../controllers/users/category.admin.controller")
let use = require("../../middlewares/useMiddleware");

router.get("/", 
    use(userCategoryController.index)
)
router.get("/:slug", 
    use(userCategoryController.show)
)

module.exports = router;