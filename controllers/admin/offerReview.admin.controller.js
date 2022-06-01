let offerReviewService = require("../../services/admin/offerReview.admin._service");

exports.index = async (req, res, next) => {
    let { offerId } = req.params;
    let reviews = await offerReviewService.getOfferReviews({ offerId });

    res.status(200).json({
        success: true,
        reviews
    })
}

exports.show = async (req, res, next) => {
    let { reviewId } = req.params;
    let reviews = await offerReviewService.getOfferReview({ id: reviewId });

    if (!reviews)
        return res.status(200).json({
            success: true,
            reviews
        });

    res.status(200).json({
        success: true,
        reviews
    })
}