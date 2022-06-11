let shippingService = require("../../services/admin/shipping.admin._service");

exports.count = async (req, res, next) => {
    let numberOfCategories = await shippingService.count();

    res.status(200).json({
        success: true,
        numberOfCategories
    })
}
exports.show = async (req, res, next) => {
    let { id } = req.params;

    let shipping = await shippingService.getShipping({ id });

    if (!shipping)
        return res.status(404).json({
            success: false,
            message: "order shipping is not found"
        });
    return res.status(200).json({
        success: true,
        shipping
    });
}
exports.index = async (req, res, next) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : null;
    let offset = req.query.offset ? parseInt(req.query.offset) : null;
    let newest = req.query.newest;

    let shippnigs = await shippingService.getAllShipping(offset, limit, newest);
    
    res.status(200).json({
        success: true,
        shippnigs
    });
}
