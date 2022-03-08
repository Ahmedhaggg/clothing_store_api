let productDisocuntService = require("../../services/admin/productDiscount.admin._service");



exports.create = async (req, res, next) => {
    let { percent, description, expiresin, productId } = req.body;

    await productDisocuntService.createDiscount({
        percent,
        description,
        expiresin,
        productId
    });

    res.status(201).json({
        success: true,
        message: "discount is created successfully"
    });
}

exports.update = async (req, res, next) => {
    let { id } = req.params;
    let { percent, description, expiresin } = req.body;

    let updatediscount = await productDisocuntService.updateDiscount(id, {
        percent,
        description,
        expiresin
    });

    if (updatediscount === false) 
        return res.status(400).json({
            success: false,
            message: "you should verifiy from data"
        });
    
    res.status(200).json({
        success: true,
        message: "discount is updated successfully"
    })
}

exports.destroy = async (req, res, next) => {
    let { id } = req.params;

    await productDisocuntService.deleteDiscount(id);

    res.status(200).json({
        message: "product is deleted successfully"
    });
}
