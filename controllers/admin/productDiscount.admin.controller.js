let productDisocuntService = require("../../services/admin/productDiscount.admin._service");

exports.show = async (req, res, next) => {
    let { discountId } = req.params;

    let discount = await productDisocuntService.getDiscount({ id: discountId });

    if (!discount) 
        return res.status(404).json({
            success: false,
            message: "product discount is not found"
        });

    res.status(200).json({
        success: true,
        discount
    });
}

exports.create = async (req, res, next) => {    
    let { percent, description, expiresin, productId } = req.body;

    let checkProductDiscount = await productDisocuntService.getDiscount({ productId });

    if (checkProductDiscount) {
        await productDisocuntService.deleteDiscount({ id: checkProductDiscount.id });
    }

    let newDiscount = await productDisocuntService.createDiscount({
        percent,
        description,
        expiresin,
        productId
    });

    res.status(201).json({
        success: true,
        message: "discount is created successfully",
        discount: newDiscount
    });
}

exports.update = async (req, res, next) => {
    let { discountId } = req.params;
    let { percent, description, expiresin } = req.body;

    let updatediscount = await productDisocuntService.updateDiscount({ id: discountId }, {
        percent,
        description,
        expiresin
    });

    if (updatediscount === false) 
        return res.status(400).json({
            success: false,
            message: "discount is not found to update"
        });
    
    res.status(200).json({
        success: true,
        message: "discount is updated successfully"
    });
}

exports.destroy = async (req, res, next) => {
    let { discountId } = req.params;

    let deleteDiscount = await productDisocuntService.deleteDiscount({ id: discountId });
    
    if (deleteDiscount === false) 
        return res.status(400).json({
            success: false,
            message: "discount is not found to delete"
        });

    res.status(200).json({
        success: true,
        message: "discount is deleted successfully"
    });
}
