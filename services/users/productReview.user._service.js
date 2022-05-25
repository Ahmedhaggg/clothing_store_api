const { ProductReview } = require("../../models");

exports.getProductReviews = async query => await ProductReview.findAll({ where: query });
exports.getReview = async query => await ProductReview.findOne({ where: query });
exports.createReview = async newData => await ProductReview.create(newData);
exports.updateReview = async (query, newData) => {
    let updatedReView = await ProductReview.update(newData, { where: query });

    return updatedReView[0] === 1 ? true : false;
}
exports.deleteReview = async query => {
    let deletedReview = await ProductReview.destroy({ where: query });

    return deletedReview === 1 ? true : false;
}
