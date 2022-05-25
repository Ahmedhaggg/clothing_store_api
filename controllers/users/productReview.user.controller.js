let ProductReviewService = require("../../services/users/productReview.user._service");

exports.index = async (req, res, next) => {
    let { productId } = req.params;
    let productReviews = await ProductReviewService.getProductReviews({ productId });

    res.status(200).json({
        success: true,
        reviews: productReviews
    });
}
exports.show = async (req, res, next) => {
    let { reviewId } = req.params;
    let review = await ProductReviewService.getReview({ id: reviewId });

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
    let { productId } = req.params;
    let { rating, comment } = req.body;
    let userId = req.user.id;

    let newReview = await ProductReviewService.createReview({
        rating, 
        comment, 
        productId,
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

    let updateReview = await ProductReviewService.updateReview({ id: reviewId }, { rating, comment});

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

    let deleteReview = await ProductReviewService.deleteReview({ id: reviewId });

    if (deleteReview === false)
        return res.status(400).json({
            success: false,
            message: "review is not found to update"
        });
    
    res.status(200).json({
        success: true,
        message: "review is deleted successfully"
    });
}
