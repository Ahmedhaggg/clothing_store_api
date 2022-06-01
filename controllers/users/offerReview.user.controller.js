let offerReviewService = require("../../services/users/offerReview.user._service");
let purchasesService = require("../../services/users/purchases.user._service");

exports.index = async (req, res, next) => {
    let { offerId } = req.params;
    let offerReviews = await offerReviewService.getofferReviews({ offerId });
 
    res.status(200).json({
        success: true,
        reviews: offerReviews
    });
}
exports.show = async (req, res, next) => {
    let { reviewId } = req.params;
    let review = await offerReviewService.getReview({ id: reviewId });

    if (!review)
        return res.status(404).json({
            success: false,
            message: "review is not found"
        });
    res.status(200).json({
        success: true,
        review
    });
}
exports.store = async (req, res, next) => {
    let { offerId } = req.params;
    let { rating, comment } = req.body;
    let userId = req.user.id;

    let checkOfferInUserPurchases = await purchasesService.checkOfferInUserPurchases({ userId, offerId });

    if (!checkOfferInUserPurchases)
        return res.status(400).json({
            success: false,
            message: "can't review in this offer, because is not in your purchases"
        });

    let newReview = await offerReviewService.createReview({
        rating, 
        comment, 
        offerId,
        userId
    });

    res.status(200).json({
        success: true,
        message: "review is created successfully",
        newReview
    });
}
exports.update = async (req, res, next) => {
    let { reviewId } = req.params;
    let { rating, comment } = req.body;
    let userId = req.user;

    let updateReview = await offerReviewService.updateReview({ id: reviewId, userId }, { rating, comment});

    if (updateReview === false)
        return res.status(400).json({
            success: false,
            message: "review is not found to update"
        });
    
    res.status(200).json({
        success: true,
        message: "review is updated successfully"
    });
}
exports.destroy = async (req, res, next) => {
    let { reviewId } = req.params;
    let userId = req.user;

    let deleteReview = await offerReviewService.deleteReview({ id: reviewId, userId });

    if (deleteReview === false)
        return res.status(400).json({
            success: false,
            message: "review is not found to delete"
        });
    
    res.status(200).json({
        success: true,
        message: "review is deleted successfully"
    });
}
