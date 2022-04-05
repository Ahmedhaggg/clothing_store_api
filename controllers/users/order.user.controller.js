let orderService = require("../../services/users/order.user._service");
let inventoryService = require("../../services/users/inventory.user._service")
let payment = require("../../helpers/payment");


exports.index = async (req, res, next) => {
    let { userId } = req.user;

    let orders = await orderService.getUserOrders({ userId });

    if (orders.length === 0)
        res.status(404).json({
            success: false,
            message: "you don't have any orders"
        });
    else 
        res.status(200).json({
            success: true,
            orders
        })
}
exports.show = async (req, res, next) => {
    let { id } = req.params;

    let order = await orderService.getOrder({ id });

    if (!order) 
        res.status(404).json({
            success: false,
            message: "order is not found"
        });
    else 
        res.status(200).json({
            success: true,
            order
        });
}



// let processOffersData = offersData => {
//         let offers = []
//         let offersProducts = [];
//         offersData.forEach(offer => {
//             offers.push({
//                 offerId: offer.id,
//                 quantity: offer.quantity,
//                 pricePerUnit: offer.pricePerUnit,
//                 totalPrice: offer.totalPrice
//             });
//             offer.products.forEach(offerProduct => {
//                 orderProduct.offerId = offer.id;
//                 offersProducts.push(offerProduct);
//             }) 
//         });
//         return {
//             offers,
//             offersProducts,
//         }
// }

exports.store = async (req, res, res) => {
    let { userId } = req.user;
    let { paymentToken, products, offers, addressId, cityShippingCost, totalPrice } = req.body
    
    if (products) {
        let checkProductIsAvailable = await inventoryService.checkProductsIsAvailable(products);
        
        if (checkProductIsAvailable !== true) 
            return res.status(400).json({
                success: false,
                message: checkProductIsAvailable.getMessage
            })
    }

    if (offers) {
        let checkOfferIAvailable = await inventoryService.checkProductsIsAvailable(offers);

        if (checkOfferIAvailable !== true) 
            return res.status(400).json({
                success: false,
                message: checkProductIsAvailable.getMessage
            })
    }


    let amount = totalPrice + cityShippingCost * 100;
    
    let checkout = await payment.pay({
        amount,
        source: paymentToken,
        currency: "usd" 
    });

    if (checkout === false)
        return res.status(400).json({
            success: false,
            message: "something happend in payment"
        })
    
    let order = await orderService.createOrder(
        {
            userId,
            totalPrice: amount,
            amount,
            addressId,
            paymentId: checkout.id
        },
        offers,
        products
    )

    // await inventoryService.updateInventory(products);
    // await inventoryService.upd
    res.status(200).json({
        success: true, 
        message: "your order is added successfully",
        order
    });
}
//  {
//     paymentToken: "",
//     totalPrice,
//     cityShippingCost,
//     addressId,
//     offers: {
//         offerId,
//         offerProducts: [
//             {
//                 productId,
//                 quantity: 10,
//                 colors: [
//                     {color: "red", quantity: 5},
//                     {color: "blue", quantity: 5},
//                 ]
//             }

//         ],
        
//     },
//     products: [
//             {
//                 productId,
//                 quantity: 10,
//                 colors: [
//                     {color: "red", quantity: 5},
//                     {color: "blue", quantity: 5},
//                 ]
//             }

//         ],
// }