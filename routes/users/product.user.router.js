let router = require("express").Router();
let userProductController = require("../../controllers/users/product.admin.controller");
let use = require("../../middlewares/useMiddleware");

router.get("/", 
    use(userProductController.index)
);

router.get("/:slug", 
    use(userProductController.show)
);




module.exports = router;