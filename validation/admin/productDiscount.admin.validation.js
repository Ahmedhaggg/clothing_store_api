let { check } = require("express-validator");
let isUnique = require("../custom/unique");
let isArray = require("../custom/isArray");

exports.validate = (action) => {
    switch (action) {
        case "create":
            return [
                check("percent").not().isEmpty().withMessage("can't be empty")
                    .isInt(),
                check("description").not().isEmpty().withMessage("can't be empty"),
                check("expiresin").not().isEmpty().withMessage("can't be empty")
                    .isDate(),
                check("productId").not().isEmpty().withMessage("can't be empty")
                    .isInt()
            ];
        case "update":
            return [
                check("percent").not().isEmpty().withMessage("can't be empty")
                    .isInt(),
                check("description").not().isEmpty().withMessage("can't be empty"),
                check("expiresin").not().isEmpty().withMessage("can't be empty")
                    .isDate()
            ];
    }
}