let { check } = require("express-validator");


exports.validate = (action) => {
    switch (action) {
        case "update":
            return [
                check("quantity").not().isEmpty().withMessage("can't be empty")
                    .isInt()
            ];
    }
}