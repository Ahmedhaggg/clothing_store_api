let { check } = require("express-validator");


exports.validate = (action) => {
    switch (action) {
        case "updateInventroy":
            return [
                check("quantity").not().isEmpty().withMessage("can't be empty")
                    .isInt(),
                check("productId").not().isEmpty().withMessage("can't be empty")
            ];
    }
}