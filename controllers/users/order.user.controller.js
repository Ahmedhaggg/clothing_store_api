let orderService = require("../../services/users/order.user._service");
let inventoryService = require("../../services/users/inventory.user._service")
let payment = require("../../helpers/payment");
let transaction = require("../../helpers/databaseTransaction");

exports.index = async (req, res, next) => {
    let  userId  = req.user.id;

    let orders = await orderService.getUserOrders({ userId });

    return res.status(404).json({
        success: false,
        orders
    });
}

exports.show = async (req, res, next) => {
    let { id } = req.params;

    let order = await orderService.getOrder({ id });

    if (!order) 
        return es.status(404).json({
            success: false,
            message: "order is not found"
        });
     
    res.status(200).json({
        success: true,
        order
    });
}

exports.store = async (req, res, next) => {
    console.log(req.body);
    let  userId  = req.user.id;
    let { paymentToken, products, offers, addressId, cityShippingCost, totalPrice } = req.body

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
        });
    
        
    let newTransaction = await transaction.createTransaction();

    try {
        let updateInventoryData = [];
        
        let order = await orderService.createOrder(
            {
                userId,
                amount,
                addressId,
                paymentId: "checkoutid"
            }, 
            newTransaction        
        );
        
        if (products) {
            
            
            await products.forEach(async product => {
                
                let newOrderProduct = await orderService.createOrderProduct({
                    productId: product.id,
                    quantity: product.quantity,
                    totalPrice: product.totalPrice,
                    pricePerUnit: product.pricePerUnit,
                    orderId: order.id
                }, newTransaction);
                
                let orderProductColorsData = product.colors.map(color => {
                    updateInventoryData.push({
                        colorId: color.id,
                        size: color.size,
                        quantity: color.quantity 
                    });
                    
                    color.orderProductId = newOrderProduct.id;
                    
                    return {
                        orderProductId: newOrderProduct.id,
                        quantity: color.quantity,
                        size: color.size,
                        productColorId: color.id
                    };
                });

                await orderService.createOrderProductColors(orderProductColorsData, newTransaction);

            });        
        }



        if (offers) {

            await offers.forEach(async offer => {
                
                let newOrderOffer = await orderService.createOrderOffer({
                    id: offer.id,
                    quantity: offer.quantity,
                    pricePerUnit: offer.pricePerUnit,
                    totalPrice: offer.totalPrice,
                    orderId: order.id
                }, newTransaction);

                await offer.products.forEach(async offerProduct => {
                    let newOfferProduct = await orderService.createOrderOfferProduct(
                        {
                            productId: offerProduct.productId,
                            orderOfferId: newOrderOffer.id,
                            quantity: offerProduct.quantity,
                        },
                        newTransaction
                    );

                    let orderOfferProductColorsData = offerProduct.colors.map(offerProductColor => {
                        offerProductColorsData.offerProductId = newOfferProduct.id;
                        updateInventoryData.push({
                            colorId: offerProductColor.colorId,
                            size: offerProductColor.size,
                            quantity: offerProductColor.quantity
                        });
                        
                        return offerProductColor;
                    })

                    await orderService.createOrderProductColors(orderOfferProductColorsData, newTransaction)
                });
            })
        }


        let updateInventories = updateInventoryData.map( inventoryUpdate => {
                
            let decrementInventoryColor = inventoryService.decrementInventory({
                size: inventoryUpdate.size,
                colorId: inventoryUpdate.productColorId
            }, inventoryUpdate.quantity , transaction)
            
            return decrementInventoryColor;
        });
                    
            
        let updateInventoriesResult =  await Promise.all(updateInventories);

        updateInventoriesResult.forEach(updateInventoryResult => {
            if (updateInventoryResult === false) 
                throw new Error("some products in your order is not available")
        })

        await transaction.saving(newTransaction);

        res.status(200).json({
            success: true,
            message: "order is created successfully"
        });

    } catch (error) {
        await transaction.cancel(newTransaction);

        res.status(400).json({ 
            success: false,
            message: error
        });
    }
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

// exports.store = async (req, res, next) => {
//     let { userId } = req.user;
//     let { paymentToken, products, offers, addressId, cityShippingCost, totalPrice } = req.body
    
//     if (products) {
//         let checkProductIsAvailable = await inventoryService.checkProductsIsAvailable(products);
        
//         if (checkProductIsAvailable !== true) 
//             return res.status(400).json({
//                 success: false,
//                 message: checkProductIsAvailable.getMessage
//             })
//     }

//     if (offers) {
//         let checkOfferIAvailable = await inventoryService.checkProductsIsAvailable(offers);

//         if (checkOfferIAvailable !== true) 
//             return res.status(400).json({
//                 success: false,
//                 message: checkProductIsAvailable.getMessage
//             })
//     }


//     let amount = totalPrice + cityShippingCost * 100;
    
//     let checkout = await payment.pay({
//         amount,
//         source: paymentToken,
//         currency: "usd" 
//     });

//     if (checkout === false)
//         return res.status(400).json({
//             success: false,
//             message: "something happend in payment"
//         })
    
//     let order = await orderService.createOrder(
//         {
//             userId,
//             totalPrice: amount,
//             amount,
//             addressId,
//             paymentId: checkout.id
//         },
//         offers,
//         products
//     )

//     // await inventoryService.updateInventory(products);
//     // await inventoryService.upd
//     res.status(200).json({
//         success: true, 
//         message: "your order is added successfully",
//         order
//     });
// }
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