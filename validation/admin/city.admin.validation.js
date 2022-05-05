let { check } = require("express-validator");
const isUnique = require("../custom/unique");


exports.validate = (action) => {
    switch (action) {
        case "create":
            return [
                check("name").not().isEmpty().withMessage("can't be empty"),
                check("governorateId").not().isEmpty().withMessage("can't be empty"),
                check("shippingTime").not().isEmpty().withMessage("can't be empty"),
                check("shippingCost").not().isEmpty().withMessage("can't be empty")
                    .isInt(),
                isUnique("cities", "name")
            ];
        case "update": 
            return [
                check("shippingTime").not().isEmpty().withMessage("can't be empty"),
                check("shippingCost").not().isEmpty().withMessage("can't be empty")
                    .isInt()
            ]
    }
}