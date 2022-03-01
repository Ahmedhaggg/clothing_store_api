let { check } = require("express-validator");
let isUnique = require("../custom/unique");
exports.validate = (action) => {
    switch (action) {
        case "addCategory":
            return [
                check("name").not().isEmpty().withMessage("can't be empty"),
                    isUnique("categories", "name")
            ];
        default:
            throw new Error("something went wrong");
    }
}