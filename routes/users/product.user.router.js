let router = require("express").Router();
let userProductController = require("../../controllers/users/product.admin.controller");

router.get("/", 
    userProductController.index
)

router.get("/:slug", 
    userProductController.show
)




module.exports = router;