let reviewService = require("../../services/admin/productReview.admin._service");

exports.index = async (req, res, next) => {
    let { productId } = req.params;
    let reviews = await reviewService.getProductReviews({ productId });

    res.status(200).json({
        success: true,
        reviews
    })
}

exports.show = async (req, res, next) => {
    let { reviewId } = req.params;
    let reviews = await reviewService.getProductReview({ id: reviewId });

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