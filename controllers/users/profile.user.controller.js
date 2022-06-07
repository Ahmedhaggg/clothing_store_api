let userservice = require("../../services/users/profile.user._service");
let productReviewsService = require("../../services/users/productReview.user._service");
let offerReviewsService = require("../../services/users/offerReview.user._service");

exports.showProfile = async (req, res, next) => {
    let { userId } = req.params;
    
    let profile = await userservice.getProfile({ id: userId });
    
    if (!profile)
        return res.status(404).json({
            success: false,
            message: "can't find this profile"
        })

    res.status(200).json({
        success: true,
        profile
    })
}

exports.showProductsReviews = async (req, res, next) => {
    let { userId } = req.params;
    
    let productsReviews = await productReviewsService.getProductReviews({ userId });
    
    if (productsReviews.length === 0)
        return res.status(404).json({
            success: false,
            message: "you havn't reviews in any product"
        });

    res.status(200).json({
        success: true,
        productsReviews
    });
}

exports.showOffersReviews = async (req, res, next) => {
    let { userId } = req.params;
    
    let offerReviews = await offerReviewsService.getUserReviews({ userId });
    
    if (offerReviews.length === 0)
        return res.status(404).json({
            success: false,
            message: "you havn't reviews in any offer"
        });

    res.status(200).json({
        success: true,
        offerReviews
    });
}
