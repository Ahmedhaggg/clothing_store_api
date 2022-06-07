let salesService = require("../../services/admin/sales.admin._service");
let shippingService = require("../../services/admin/shipping.admin._service")
let shipperService = require("../../services/admin/shipper.admin._service");


exports.index = async (req, res, next) => {
    let { offset, limit} = req.query
    let sales = await salesService.getSales(offset, limit);

    res.status(200).json({
        success: true,
        sales
    })
}

exports.show = async (req, res, next) => {
    let { id } = req.params
    let salesById = await salesService.getOneSales({ id });

    if (!salesById)
        return res.status(404).json({
            success: false,
            message: "sales is not found by this id"
        })

    res.status(200).json({
        success: true,
        sales: salesById
    })
}

exports.store = async (req, res, next) => {
    let { orderId } = req.body;
    let newSales = await salesService.createSales({ id: orderId });
    
    if (newSales === false)
        return res.status(404).json({
            success: false,
            message: "order is not found to completed into sales" 
        });

    let shipping = await shippingService.getOrderShipping({ orderId });
    
    
    await shippingService.deleteShipping({ id: shipping.id })

    await shipperService.updateShipper({ id: shipping.shipperId }, { status: "available"})
    
    return res.status(200).json({
        success: true, 
        message: "order is completed and added to sales successfully"
    })
    
}