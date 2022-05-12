let { check, body } = require("express-validator");
let isUnique = require("../custom/unique");
let passwordIsConfirmed = require("../custom/passwordIsConfirmed")
exports.validate = (action) => {
    switch (action) {
        case "create":
            return [
                check("addressId").not().isEmpty().withMessage("can't be empty"),
                check("paymentToken").not().isEmpty().withMessage("can't be empty"),
                check("cityShippingCost").not().isEmpty().withMessage("can't be empty"),
                check("totalPrice").not().isEmpty().withMessage("can't be empty"),
                check("products[*]id")
                    .if(body("products").exists())
                        .not().isEmpty().withMessage("can't be empty")
                        .isInt(),
                check("products[*]quantity")
                    .if(body("products").exists())
                        .not().isEmpty().withMessage("can't be empty")
                        .isInt(),
                check("products[*]pricePerUnit")
                    .if(body("products").exists())
                        .not().isEmpty().withMessage("can't be empty")
                        .isFloat(),
                check("products[*]totalPrice")
                    .if(body("products").exists())
                        .not().isEmpty().withMessage("can't be empty")
                        .isFloat(),
                check("products[*]colors[*]id")
                    .if(body("products").exists())
                        .not().isEmpty().withMessage("can't be empty")
                        .isInt(),
                check("products[*]colors[*]quantity")
                    .if(body("products").exists())
                        .not().isEmpty().withMessage("can't be empty")
                        .isInt(),
                check("products[*]colors[*]size")
                    .if(body("products").exists())
                        .not().isEmpty().withMessage("can't be empty"),
                check("offers[*]id")
                    .if(body("offers").exists())
                        .not().isEmpty().withMessage("can't be empty")
                        .isInt(),
                check("offers[*]quantity")
                    .if(body("offers").exists())
                        .not().isEmpty().withMessage("can't be empty")
                        .isInt(),
                check("offers[*]totalPrice")
                    .if(body("offers").exists())
                        .not().isEmpty().withMessage("can't be empty")
                        .isFloat(),
                check("offers[*]pricePerUnit")
                    .if(body("offers").exists())
                        .not().isEmpty().withMessage("can't be empty")
                        .isFloat(),

                check("offers[*]products[*]colors[*]id")
                    .if(body("offers").exists())
                        .not().isEmpty().withMessage("can't be empty")
                        .isInt(),
                check("offers[*]products[*]colors[*]quantity")
                    .if(body("offers").exists())
                        .not().isEmpty().withMessage("can't be empty")
                        .isInt(),
                check("offers[*]products[*]colors[*]size")
                    .if(body("offers").exists())
                        .not().isEmpty().withMessage("can't be empty")
            ];
        default:
            throw new Error("something went wrong");
    }
}