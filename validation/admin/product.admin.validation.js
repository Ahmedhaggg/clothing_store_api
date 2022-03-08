let { check, body } = require("express-validator");
let isUnique = require("../custom/unique");
let isArray = require("../custom/isArray");
let isFile = require("../custom/isFile");

exports.validate = (action) => {
    switch (action) {
        case "addProduct":
            return [
                check("name").not().isEmpty().withMessage("can't be empty"),
                check("price").not().isEmpty().withMessage("can't be empty")
                    .isDecimal(),
                check("description").not().isEmpty().withMessage("can't be empty"),
                check("categoryId").not().isEmpty().withMessage("can't be empty"),
                check("subcategoryId").not().isEmpty().withMessage("can't be empty"),
                check("quantity").not().isEmpty().withMessage("can't be empty")
                    .isInt().withMessage("can't be number"),
                check("discount.expiresin")
                    .if(body("discount")).exists()
                    .not().isEmpty().withMessage("can't be empty")
                    .isDate().withMessage("should be date"),
                check("discount.percent")
                    .if(body("discount")).exists()
                    .not().isEmpty().withMessage("can't be empty")
                    .isInt().withMessage("can't be number"),
                check("discount.description")
                    .if(body("discount")).exists()
                    .not().isEmpty().withMessage("can't be empty"),
                check("colors.*.name").not().isEmpty().withMessage("can't be empty"),
                isArray("colors", { min: 1, max: 6}),
                isUnique("products", "name"),
                isFile("image")
            ];
        case "updateProduct": 
            return [
                check("name").not().isEmpty().withMessage("can't be empty"),
                check("price").not().isEmpty().withMessage("can't be empty")
                    .isDecimal(),
                check("description").not().isEmpty().withMessage("can't be empty"),
                check("categoryId").not().isEmpty().withMessage("can't be empty"),
                check("subcategoryId").not().isEmpty().withMessage("can't be empty")
            ];
        case "updateProductImage": 
            return [
                isFile("image")
            ]    
    }
}