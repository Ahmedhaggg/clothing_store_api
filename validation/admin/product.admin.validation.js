let { check } = require("express-validator");
let isUnique = require("../custom/unique");
let isArray = require("../custom/isArray");
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
                check("discountExpiresin").not().isEmpty().withMessage("can't be empty")
                    .isDate().withMessage("should be date"),
                check("discountPercent").not().isEmpty().withMessage("can't be empty")
                    .isInt().withMessage("can't be number"),
                check("discountDescription").not().isEmpty().withMessage("can't be empty"),
                check("colors.*.name").not().isEmpty().withMessage("can't be empty"),
                isArray("colors", { min: 1, max: 5}),
                isUnique("products", "name")
            ];
        
            
    }
}