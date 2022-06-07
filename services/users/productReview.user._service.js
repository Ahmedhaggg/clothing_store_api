const { ProductReview, User, Product } = require("../../models");

exports.getProductReviews = async query => await ProductReview
    .findAll({ 
        where: query, 
        attributes: ["id", "comment", "rating", "createdAt", "updatedAt"],
        include: [
            {
                model: User,
                attributes: ["id", "userName"]
            }
        ]
    });

exports.getReview = async query => await ProductReview
    .findOne({ 
        where: query,
        attributes: ["id", "comment", "rating", "createdAt", "updatedAt"]
    });
    
exports.createReview = async newData => await ProductReview.create(newData);

exports.updateReview = async (query, newData) => {
    let updatedReView = await ProductReview.update(newData, { where: query });

    return updatedReView[0] === 1 ? true : false;
}
exports.deleteReview = async query => {
    let deletedReview = await ProductReview.destroy({ where: query });

    return deletedReview === 1 ? true : false;
}

exports.getUserReviews = async query => await ProductReview
    .findAll({
        where: query,
        attributes: ["id", "comment", "rating", "createdAt", "updatedAt"],
        include: [
            {
                model: User,
                attributes: ["id", "userName"]
            },
            {
                model: Product,
                attributes: ["id", "name", "image"]
            }
        ]
    })