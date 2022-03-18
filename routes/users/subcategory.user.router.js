let router = require("express").Router();
let userSubcategoryController = require("../../controllers/users/subcategory.admin.controller")

router.get("/:slug/products", 
    userSubcategoryController.show
)

module.exports = router;