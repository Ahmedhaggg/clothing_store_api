let { check, body } = require("express-validator");
let isUnique = require("../custom/unique");
let isArray = require("../custom/isArray");
let isFile = require("../custom/isFile");

exports.validate = (action) => {
    switch (action) {
        case "create":
            return [
                check("name").not().isEmpty().withMessage("can't be empty"),
                check("price").not().isEmpty().withMessage("can't be empty")
                    .isDecimal(),
                check("description").not().isEmpty().withMessage("can't be empty"),
                check("categoryId").not().isEmpty().withMessage("can't be empty"),
                check("subcategoryId").not().isEmpty().withMessage("can't be empty"),
                check("inventory.*.quantity").not().isEmpty().withMessage("can't be empty")
                    .isInt().withMessage("can't be number"),
                check("inventory.*.size").not().isEmpty().withMessage("can't be empty")
                    .isInt().withMessage("can't be number"),
                check("discount.expiresin")
                    .if(body("discount").exists())
                    .not().isEmpty().withMessage("can't be empty"),
                check("discount.percent")
                    .if(body("discount").exists())
                    .not().isEmpty().withMessage("can't be empty")
                    .isInt().withMessage("can't be number"),
                check("discount.description")
                    .if(body("discount").exists())
                    .not().isEmpty().withMessage("can't be empty"),
                isArray("productDetails"),
                check("productDetails.*.color").not().isEmpty().withMessage("can't be empty"),
                isArray("productDetails[0].sizes"),
                check("productDetails.*.sizes.*.size").not().isEmpty().withMessage("can't be empty"),
                check("productDetails.*.sizes.*.quantity").not().isEmpty().withMessage("can't be empty")
                    .isInt({ min: 1 }),
                isFile("image"),
                isUnique("products", "name")
            ];
        case "update": 
            return [
                check("name").not().isEmpty().withMessage("can't be empty"),
                check("price").not().isEmpty().withMessage("can't be empty")
                    .isDecimal(),
                check("description").not().isEmpty().withMessage("can't be empty")
            ];
        case "updateImage": 
            return [
                isFile("image")
            ]    
    }
}
