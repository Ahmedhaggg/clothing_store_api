let router = require("express").Router();
let userSubcategoryController = require("../../controllers/users/subcategory.admin.controller")
let use = require("../../middlewares/useMiddleware");

router.get("/:slug", 
    use(userSubcategoryController.show)
)

module.exports = router;