let { check, body } = require("express-validator");
let isUnique = require("../custom/unique");
let isArray = require("../custom/isArray");
let isFile = require("../custom/isFile");

exports.validate = (action) => {
    switch (action) {
        case "create":
            return [
                check("offerId").not().isEmpty().withMessage("can't be empty"),
                check("[productId]").not().isEmpty().withMessage("can't be empty")
                    .isDecimal(),
                check("quantity").not().isEmpty().withMessage("can't be empty")
                    .isInt({ min: 1 })
            ];
        case "update": 
            return [
                check("quantity").not().isEmpty().withMessage("can't be empty")
                    .isInt({ min: 1 })
            ];
    }
}
