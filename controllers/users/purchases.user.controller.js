let purchasesService = require("../../services/users/purchases.user._service");

exports.index = async (req, res, next) => {
    let userId = req.user.id;
    let purchases = await purchasesService.getAllUserPurchases({ userId });

    res.status(200).json({
        success: true,
        purchases
    });
}

exports.show = async (req, res, next) => {
    let { id } = req.params;
    let purchase = await purchasesService.getPurchase({ id });

    if (!purchase)
        return res.status(200).json({
            success: true,
            message: "purchase is not found"
        });

    res.status(200).json({
        success: true,
        purchase
    });
}