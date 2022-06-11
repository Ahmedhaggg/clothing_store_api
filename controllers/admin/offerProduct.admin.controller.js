let offerProductService = require("../../services/admin/offerProduct.admin._service")

exports.store = async (req, res, next) => {
    let { productId, offerId, quantity } = req.body;

    let checkProductInOffer = await offerProductService.getSomeOfferProductData({
        productId,
        offerId
    }, ["id"]);

    if (checkProductInOffer) 
        return res.status(400).json({
            success: false,
            message: "can't add this product into offer because this product already on this offer"
        });

    let newOfferProduct = await offerProductService.addProductToOffer({
        productId,
        quantity,
        offerId
    });

    res.status(201).json({
        success: true,
        message: "new product added to offer successfully",
        newOfferProduct
    });
}

exports.update = async (req, res, next) => {
    let { id } = req.params;
    let {  quantity } = req.body;
    let offerProduct = await offerProductService.getSomeOfferProductData({ id }, ["id"])
    
    if (!offerProduct)
        return res.status(400).json({
            success: false,
            message: "product is not found in this offer"
        });

    let updateOfferProduct = await offerProductService.updateOfferProduct({ id }, { quantity })

    if (updateOfferProduct === true)
        return res.status(200).json({
            success: true,
            message: "product of this offer is updated successfully"
        })
    
    res.status(400).json({
        success: false,
        message: `quantity of this product on offer already ${quantity}`
    });
}

exports.destroy = async (req, res, next) => {
    let { id } = req.params;

    let deleteOfferProduct = await offerProductService.deleteOfferProduct({ id });

    if (deleteOfferProduct === true)
        return res.status(200).json({
            success: true,
            message: "product of this offer is deleted successfully"
        })
     
    res.status(400).json({
        success: false,
        message: "product of this offer is not found"
    })
}