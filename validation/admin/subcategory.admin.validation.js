let { check } = require("express-validator");
let isUnique = require("../custom/unique");

exports.validate = (action) => {
    switch (action) {
        case "addSubcategory":
            return [
                check("name").not().isEmpty().withMessage("can't be empty"),
                    isUnique("subcategories", "name")
            ];
        case "updateSubcategory":
            return [
                check("name").not().isEmpty().withMessage("can't be empty"),
                    isUnique("subcategories", "name")
            ];
        default:
            throw new Error("something went wrong");
    }
}