let { check } = require("express-validator");


exports.validate = (action) => {
    switch (action) {
        case "createProductColor":
            return [
                check("name").not().isEmpty().withMessage("can't be empty"),
                check("productId").not().isEmpty().withMessage("can't be empty")
            ];
        case "updateProductColor":
            return [
                check("name").not().isEmpty().withMessage("can't be empty")
            ];
    }
}