const { check } = require("express-validator")

exports.validate = action => {
    switch (action) {
        case "create" : 
            return [
                check("orderId").not().isEmpty().withMessage("can't be empty")
            ]
    }
}