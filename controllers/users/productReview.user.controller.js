let productReviewService = require("../../services/users/productReview.user._service");
let purchasesService = require("../../services/users/purchases.user._service");

exports.index = async (req, res, next) => {
    let { productId } = req.params;
    let productReviews = await productReviewService.getProductReviews({ productId });

    res.status(200).json({
        success: true,
        reviews: productReviews
    });
}
exports.show = async (req, res, next) => {
    let { reviewId } = req.params;
    let review = await productReviewService.getReview({ id: reviewId });

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

    let checkProductInUserPurchases = await purchasesService.checkProductInUserPurchases({ userId, productId });

    if (!checkProductInUserPurchases)
        return res.status(400).json({
            success: false,
            message: "can't review in this product, because is not in your purchases"
        });

    let checkOldReview = await productReviewService.getReview({ userId, productId });

    if (checkOldReview) 
        return res.status(400).json({
            success: false,
            message: "can't review in this offer, because you had review in this offer"
        });

    let newReview = await productReviewService.createReview({
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
    let userId = req.user.id;

    let updateReview = await productReviewService.updateReview({ id: reviewId, userId }, { rating, comment});

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
    let userId = req.user.id;
    let deleteReview = await productReviewService.deleteReview({ id: reviewId, userId });

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
