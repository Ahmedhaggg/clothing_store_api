let purchasesService = require("../../services/users/purchases.user._service");

exports.index = async (req, res, next) => {
    let userId = req.user.id;

    let purchases = await purchasesService.getUserPurchases({ userId });

    res.status(200).json({
        success: true,
        purchases
    });
}

exports.show = async (req, res, next) => {
    
    let { id } = req.params;
    let userId = req.user.id;
    let purchase = await purchasesService.getOnePurchases({ id, userId });

    if (!purchase)
        return res.status(200).json({
            success: true,
            message: "purchases is not found"
        });

    res.status(200).json({
        success: true,
        purchase
    });
}