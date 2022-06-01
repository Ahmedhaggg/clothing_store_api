const { check } = require("express-validator")

exports.validate = action => {
    switch (action) {
        case "update": 
            return [
                check("shipperId").not().isEmpty().withMessage("can't be empty")
                    .isInt().withMessage("should be number"),
                check("endShippingWithin").not().isEmpty().withMessage("can't be empty")
            ]
    }
}