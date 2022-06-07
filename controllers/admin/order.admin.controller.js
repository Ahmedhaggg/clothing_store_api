let orderService = require("../../services/admin/order.admin._service");
let shipperService = require("../../services/admin/shipper.admin._service")
let shippingService = require("../../services/admin/shipping.admin._service")
let transaction = require("../../helpers/databaseTransaction");

exports.index = async (req, res, next) => {
    let orders = await orderService.getOrders({ status: req.query.status || "recived"});

    res.status(200).json({
        success: true,
        orders
    });
}

exports.show = async (req, res, next) => {
    let { id } = req.params;

    let order = await orderService.getOrder({ id });

    if (!order || order.status === "completed")
        return res.status(404).json({
            success: false,
            message: "order is not found" 
        });
    
    res.status(200).json({
        success: true,
        order
    });
}
/**
 * 1- update Order 
 * 2- create shipping 
 * 3- update shipper
 */ 
exports.update = async (req, res, next) => {
    let { id } = req.params;
    let { shipperId, endShippingWithin } = req.body;
    
    let newTransaction = await transaction.createTransaction();

    try {
        let updateOrder = await orderService.updateOrder({ id }, { status: "shipped" }, newTransaction);
        
        if (updateOrder === false)
            throw new Error("order is not found");

        await shippingService.createShipping({
            orderId: id,
            shipperId,
            startShippingAt: new Date(),
            endShippingWithin
        }, newTransaction);

        let updateShipperStatus = await shipperService.updateShipper(
            {id: shipperId },
            { status: "busy" },
            newTransaction
        );

        if (updateShipperStatus === false)
            throw new Error("can't shipping order by this shipper now");

        await transaction.saving(newTransaction);

        res.status(200).json({
            success: true,
            message: "order is shippered successfully"
        });
    } catch (error) {
        console.log(error)
        await transaction.cancel(newTransaction);

        res.status(200).json({
            success: true,
            message: error
        });
    }
}
