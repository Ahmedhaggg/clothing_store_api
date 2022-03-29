let offerProductService = require("../../services/admin/offerProduct.admin._service")
exports.store = async (req, res, next) => {
    let { productId, offerId, quantity } = req.body;

    await offerProductService.createOffer({
        productId,
        quantity,
        offerId
    });

    res.status(201).json({
        success: true,
        message: "new product added to offer successfully"
    });
}

exports.update = async (req, res, next) => {
    let { id } = req.params;
    let {  quantity } = req.body;

    let updateOfferProduct = await offerProductService.updateOffer({ id }, { quantity })

    if (updateOfferProduct === true)
        res.status(200).json({
            success: true,
            message: "offer product is updated successfully"
        })
    else 
        res.status(400).json({
            success: false,
            message: "update offer product faild"
        })
}

exports.destroy = async (req, res, next) => {
    let { id } = req.params;

    let deleteOfferProduct = await offerProductService.deleteOffer({ id });

    if (deleteOfferProduct === true)
        res.status(200).json({
            success: true,
            message: "offer product is deleted successfully"
        })
    else 
        res.status(400).json({
            success: false,
            message: "delete offer product faild"
        })
}