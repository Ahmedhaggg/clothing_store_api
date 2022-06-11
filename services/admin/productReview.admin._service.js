let { ProductReview, User } = require("../../models")

exports.count = async () => await ProductReview.count();

exports.getProductReviews = async query => await ProductReview
    .findAll({
        where:  query,
        attributes: ["id", "rating", "comment", "createdAt", "updatedAt" ],
        include: {
            model: User,
            attributes: ["id", "userName"]
        }
    });

exports.getProductReview = async query => await ProductReview
    .findOne({
        where:  query,
        attributes: ["id", "rating", "comment", "createdAt", "updatedAt" ],
        include: {
            model: User,
            attributes: ["id", "userName"]
        }
    });