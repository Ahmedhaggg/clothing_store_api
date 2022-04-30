let { check } = require("express-validator");
let isArray = require("../custom/isArray");

exports.validate = (action) => {
    switch (action) {
        case "create":
            return [
                check("name").not().isEmpty().withMessage("can't be empty"),
                check("productId").not().isEmpty().withMessage("can't be empty"),
                isArray("sizes"),
                check("sizes.*.size").not().isEmpty().withMessage("can't be empty"),
                check("sizes.*.quantity").not().isEmpty().withMessage("can't be empty")
                    .isInt({ min: 1 })
            ];
    }
}