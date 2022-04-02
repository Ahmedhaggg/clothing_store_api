let orderService = require("../../services/users/order.user._service");
let inventoryService = require("../../services/users/inventory.user._service")
let payment = require("../../helpers/payment");

let processOffersData = offersData => {
        let offers = []
        let offersProducts = [];
        offersData.forEach(offer => {
            offers.push({
                offerId: offer.id,
                quantity: offer.quantity,
                pricePerUnit: offer.pricePerUnit,
                totalPrice: offer.totalPrice
            });
            offer.products.forEach(offerProduct => {
                orderProduct.offerId = offer.id;
                offersProducts.push(offerProduct);
            }) 
        });
        return {
            offers,
            offersProducts,
        }
}

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
        let checkOfferIAvailable = await inventoryService.checkProductsIsAvailable(productsIdList);

        if (checkOfferIAvailable !== true) 
            return res.status(400).json({
                success: false,
                message: checkProductIsAvailable.getMessage
            })
        
        let processOffers = processOffersData(offers);

        offers = processOffers.offers;
        products.push(...processOffers.offersProducts);
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
            addressId
        },
        products,
        offers
    )

    res.status(200).json({
        success: true, 
        message: "your order is added successfully",
        order
    })
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