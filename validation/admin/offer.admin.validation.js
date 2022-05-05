let { check, body, param } = require("express-validator");
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
                check("expiresin").not().isEmpty().withMessage("can't be empty"),
                isArray("offerProducts"),
                check("offerProducts[*]productId").not().isEmpty().withMessage("can't be empty"),
                check("offerProducts[*]quantity").not().isEmpty().withMessage("can't be empty"),
                isFile("image"),
                isUnique("offers", "name")
            ];
        case "update": 
            return [
                check("name").not().isEmpty().withMessage("can't be empty"),
                check("price").not().isEmpty().withMessage("can't be empty")
                    .isDecimal(),
                check("description").not().isEmpty().withMessage("can't be empty"),
                check("expiresin").not().isEmpty().withMessage("can't be empty")
            ];
        case "updateImage": 
            return [
                isFile("image")
            ]    
    }
}
