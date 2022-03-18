let router = require("express").Router();
let userCategoryController = require("../../controllers/users/category.admin.controller")

router.get("/", 
    userCategoryController.index
)
router.get("/:slug/products", 
    userCategoryController.show
)

module.exports = router;