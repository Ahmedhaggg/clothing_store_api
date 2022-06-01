const { OfferReview, User } = require("../../models");

exports.getOfferReviews = async query => await OfferReview
    .findAll({ 
        where: query, 
        attributes: ["id", "comment", "rating", "createdAt", "updatedAt"],
        include: [
            {
                model: User,
                attributes: ["id", "name", "image"]
            }
        ]
    });
exports.getReview = async query => await OfferReview
    .findOne({ 
        where: query,
        attributes: ["id", "comment", "rating", "createdAt", "updatedAt"]
    });
    
exports.createReview = async newData => await OfferReview.create(newData);

exports.updateReview = async (query, newData) => {
    let updatedReView = await OfferReview.update(newData, { where: query });

    return updatedReView[0] === 1 ? true : false;
}
exports.deleteReview = async query => {
    let deletedReview = await OfferReview.destroy({ where: query });

    return deletedReview === 1 ? true : false;
}
