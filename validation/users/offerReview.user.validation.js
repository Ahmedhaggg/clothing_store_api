const { check } = require("express-validator")

exports.validate = (action) => {
    switch (action) {
        case "create": 
            return [
                check("rating").not().isEmpty().withMessage("can't be empty")
                    .isInt().withMessage("can't ne number"),
                check("comment").not().isEmpty().withMessage("can't be empty")
            ];
        case "update": 
            return [
                check("rating").not().isEmpty().withMessage("can't be empty")
                    .isInt().withMessage("can't ne number"),
                check("comment").not().isEmpty().withMessage("can't be empty")
            ]
    }
}