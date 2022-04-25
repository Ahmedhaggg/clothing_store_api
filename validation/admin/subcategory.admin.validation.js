let { check } = require("express-validator");
let isUnique = require("../custom/unique");

exports.validate = (action) => {
    switch (action) {
        case "create":
            return [
                check("name").not().isEmpty().withMessage("can't be empty"),
                    isUnique("subcategories", "name")
            ];
        case "update":
            return [
                check("name").not().isEmpty().withMessage("can't be empty"),
                    isUnique("subcategories", "name")
            ];
        default:
            throw new Error("something went wrong");
    }
}