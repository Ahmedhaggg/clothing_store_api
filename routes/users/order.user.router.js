let router = require("express").Router();
let use = require("../../middlewares/useMiddleware");
let userOrderController = require("../../controllers/users/order.user.controller");

router.get("/", 
    use(userOrderController.get)    
);


router.get("/:id", 
    use(userOrderController.show)
);

router.post("/", 
    use(userOrderController.store)
);

module.exports = router;