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

let updateInventories = async (inventoryData, trans) =>
    await Promise.all(inventoryData.map( async inventoryUpdate => {
        
        let decrementInventoryColor = await inventoryService.decrementInventory({
            size: inventoryUpdate.size,
            colorId: inventoryUpdate.colorId
        }, inventoryUpdate.quantity , trans);
        
        return decrementInventoryColor;
    }));

exports.store = async (req, res, next) => {
    let  userId  = req.user.id;
    let { paymentToken, products, offers, addressId, cityShippingCost, totalPrice } = req.body
    
    // calculate amout and use it in checkout * 100
    let amount = totalPrice  + cityShippingCost;
    
    let newTransaction = await transaction.createTransaction();

    try {
        // store data of product in order to check and update it
        let updateInventoryData = [];
        
        let order = await orderService.createOrder(
            {
                userId,
                amount,
                addressId,
                paymentId: null
            }, 
            newTransaction        
        );
        
        /**
         * 1- check product in order
         * 2- loop 
         * 3- insert product in db
         * 4- loop in colors, push inventory update data and return colors data
         * 5- insert colors in db
        */
        if (products) {
            
            await Promise.all(products.map( async product => {
            
                let newOrderProduct = await orderService.createOrderProduct({
                    productId: product.id,
                    quantity: product.quantity,
                    totalPrice: product.totalPrice,
                    pricePerUnit: product.pricePerUnit,
                    orderId: order.id
                }, newTransaction);
                
                let newOrderProductColorsData = product.colors.map(color => {
                    updateInventoryData.push({
                        colorId: color.id,
                        size: color.size,
                        quantity: color.quantity 
                    });
                                        
                    return {
                        orderProductId: newOrderProduct.id,
                        quantity: color.quantity,
                        size: color.size,
                        productColorId: color.id
                    };
                });

                await orderService.createOrderProductColors(newOrderProductColorsData, newTransaction);
            }));   
        }


        /**
         * 1- check offers in order
         * 2- loop 
         * 3- insert offer in db
         * 4- loop product in offers
         * 5- insert products from offer in db
         * 4- loop in colors, push inventory update data and return colors data
         * 5- insert colors
        */

        if (offers) {

            await Promise.all(offers.map(async offer => {
                
                let newOrderOffer = await orderService.createOrderOffer({
                    offerId: offer.id,
                    quantity: offer.quantity,
                    pricePerUnit: offer.pricePerUnit,
                    totalPrice: offer.totalPrice,
                    orderId: order.id
                }, newTransaction);

                await Promise.all(offer.products.map(async offerProduct => {
                    let newOrderOfferProduct = await orderService.createOrderOfferProduct(
                        {
                            productId: offerProduct.productId,
                            orderOfferId: newOrderOffer.id,
                            quantity: offerProduct.quantity,
                        },
                        newTransaction
                    );

                    let orderOfferProductColorsData = offerProduct.colors.map(color => {
                        
                        updateInventoryData.push({
                            colorId: color.id,
                            size: color.size,
                            quantity: color.quantity
                        });
                         
                        return {
                            orderOfferProductId: newOrderOfferProduct.id,
                            quantity: color.quantity,
                            size: color.size,
                            productColorId: color.id
                        };
                    })

                    await orderService.createOrderProductColors(orderOfferProductColorsData, newTransaction)
                }));
            }));
        }

        
        let updateInventoriesResult =  await updateInventories(updateInventoryData, newTransaction);
        
        updateInventoriesResult.forEach(updateInventoryResult => {
            
            if (updateInventoryResult === false) 
                throw new Error("some products in your order is not available")
        });

        let checkout = await payment.pay({
            amount: amount * 100,
            source: paymentToken,
            currency: "usd",
        });
    
        if (checkout.success === false) 
            throw new Error("invalid payment")
        
        await orderService.updateOrder({ id: order.id }, { paymentId: checkout.id }, newTransaction);

        await transaction.saving(newTransaction);

        res.status(200).json({
            success: true,
            message: "order is created successfully"
        });
 
    } catch (error) {
        await transaction.cancel(newTransaction);

        res.status(400).json({ 
            success: false,
            message: error.message
        });
    }
}