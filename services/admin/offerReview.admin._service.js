let { OfferReview, User } = require("../../models")

exports.count = async () => await OfferReview.count();

exports.getOfferReviews = async query => await OfferReview
    .findAll({
        where:  query,
        attributes: ["id", "rating", "comment", "createdAt", "updatedAt" ],
        include: {
            model: User,
            attributes: ["id", "userName"]
        }
    });

exports.getOfferReview = async query => await OfferReview
    .findOne({
        where:  query,
        attributes: ["id", "rating", "comment", "createdAt", "updatedAt" ],
        include: {
            model: User,
            attributes: ["id", "userName"]
        }
    });