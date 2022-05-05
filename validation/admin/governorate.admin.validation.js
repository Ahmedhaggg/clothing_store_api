let { check } = require("express-validator");
const isUnique = require("../custom/unique");


exports.validate = (action) => {
    switch (action) {
        case "create":
            return [
                check("name").not().isEmpty().withMessage("can't be empty"),
                isUnique("governorates", "name")
            ];
    }
}