const { check } = require("express-validator")


exports.validate = action => {
    switch (action) {
        case "create": 
            return [
                check("name").not().isEmpty().withMessage("can't be empty")
            ]
    }
}