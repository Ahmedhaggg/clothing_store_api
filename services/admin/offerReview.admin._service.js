let { OfferReview, User } = require("../../models")

exports.getOfferReviews = async query => await OfferReview
    .findAll({
        where:  query,
        attributes: ["id", "ratings", "comment", "createdAt", "updatedAt" ],
        include: {
            model: User,
            attributes: ["id", "userName"]
        }
    });

exports.getOfferReview = async query => await OfferReview
    .findOne({
        where:  query,
        attributes: ["id", "ratings", "comment", "createdAt", "updatedAt" ],
        include: {
            model: User,
            attributes: ["id", "userName"]
        }
    });