let { check } = require("express-validator");
let isUnique = require("../custom/unique");
let passwordIsConfirmed = require("../custom/passwordIsConfirmed")
exports.validate = (action) => {
    switch (action) {
        case "create":
            return [
                check("governorateId").not().isEmpty().withMessage("can't be empty"),
                check("cityId").not().isEmpty().withMessage("can't be empty"),
                check("firstZone").not().isEmpty().withMessage("can't be empty"),
                check("secondZone").not().isEmpty().withMessage("can't be empty")
            ];
        case "update": 
            return [
                check("firstZone").not().isEmpty().withMessage("can't be empty"),
                check("secondZone").not().isEmpty().withMessage("can't be empty")
            ];
        default:
            throw new Error("something went wrong");
    }
}