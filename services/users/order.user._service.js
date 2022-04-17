let { Inventory, Order, OrderOffer, OrderProduct, OrderOfferProduct, Shipping, Offer, Product, ProductDiscount, Address, OrderProductColor, ProductColor, City, Governorate } = require("../../models");
let db = require("../../config/database");
exports.getUserOrders = async query => await Order   
    .findAll({
        where: query,
        include: [
            {
                model: Shipping,
                attributes: ["startShippingAt", "endShippingWithin"]
            }
        ]
    });
 

exports.createOrder = async (orderData, transaction) => {
    try {
        return await Order.create(orderData, { transaction});
    } catch (_) {
        return null;
    }
}

exports.createOrderProduct = async (productData, transaction) => {
    try {
        return await OrderProduct.create(productData, { transaction});
    } catch (_) {
        return null;
    }
}

exports.createOrderProductColors = async (colorsData, transaction) => {
    try {
        return await OrderProductColor.bulkCreate(colorsData, { transaction });
    } catch (_) {
        return null;
    }
}

exports.createOrderOffer = async (offerData, transaction) => {
    try {
        return await OrderOffer.create(offerData, { transaction });
    } catch (_) {
        return null;
    }
}

exports.createOrderOfferProduct = async (offerProductData, transaction) => {
    try {
        return await OrderOfferProduct.create(offerProductData, { transaction });
    } catch (_) {
        return null;
    }
}




exports.create = async (orderData, productsData = null, offersData = null, offersProductsData = null) => {
    let newTransaction = await db.transaction();
    
    try {
        let newOrder = await Order.create(orderData, { transaction: newTransaction });
        
        if (productsData) {
            let newOrderProductsData = productsData.map(productData => {
                let { quantity, productId, pricePerUnit, totalPrice } = productData;
                return {
                    orderId: newOrder.id,
                    quantity,
                    pricePerUnit,
                    totalPrice,
                    productId
                }
            });
            let newOrderProducts = await OrderProduct.bulkCreate(newOrderProductsData, { transaction: newTransaction });
            
            let newOrderProductsColorsData = []
            productsData.forEach(productData => {
                let newOrderProduct = newOrderProducts.find(orderProduct => orderProduct.productId = productData.productId)
                productData.colors.forEach(productColor => { 
                    productColor.orderProductId = newOrderProduct.id;
                    newOrderProductsColorsData.push(productColor);
                });
            })
            
            
            let newOrderProductsColors = await OrderProductColor.bulkCreate(newOrderProductsColorsData, { transaction: newTransaction });

            newOrderProductsColors.forEach(async newOrderProductColor => {
                await Inventory.increment(
                { 
                    quantity: -(newOrderProductColor.quantity) 
                }, { 
                    where: { 
                        colorId: newOrderProductColor.productId,
                        size: newOrderProductColor.size
                    }, 
                    transaction: newTransaction 
                    } 
                );
            });
        }

        // if (offersData) {
        //     let newOrderOffersData = offersData.map(offerData => {
        //         let { quantity, offerId, pricePerUnit, totalPrice } = offerData;
        //         return {
        //             orderId: newOrder.id,
        //             quantity,
        //             pricePerUnit,
        //             totalPrice,
        //             offerId
        //         }
        //     });
        //     let newOrderOffers = await OrderOffer.bulkCreate(newOrderOffersData, { transaction: newTransaction });

        //     let newOrderOfferProductsColorsData = offersData.map(offerData => {
        //         let newOrderOffer = newOrderOffers.find(orderOffer => orderProduct.productId = productData.id)
        //         productData.colors.forEach(productColor => { productColor.orderProductId = newOrderProduct.id });
        //         return productData.colors;
        //     })
        // }
        await newTransaction.commit();
        return newOrder;
    } catch (error) {
        await newTransaction.rollback()
    }
}

// exports.createOrder = async (order, offers = null, offersProducts = null, products = null) => {
//     let newTransaction = await db.transaction();
//     try {
//         let newOrder = await Order.create(order, { transaction: newTransaction });

//         if (offers) {
//             offers.forEach(offerData => {
//                 offerData.orderId = newOrder.id;
//             });

//             let newOrderOffers = await OrderOffer.bulkCreate(offers, { transaction: newTransaction });
            
//             let newOffersProductsData = offersProducts.map(offerProduct => {
//                 let offer = newOrderOffers.findOne(orderOffer => orderOffer.offerId === offerProduct.offerId);
//                 return {
//                     productId: offerProduct.id,
//                     quantity: offerProduct.quantity,
//                     colors: offerProduct.colors,
//                     orderOfferId: offer.id
//                 }
//             })

            
//             let newOrderOffersProducts = await OrderOfferProduct.bulkCreate(newOffersProductsData, { transaction: newTransaction });

//             newOrderOffersProducts.forEach(async newOrderOfferProduct => {
//                 await Inventory.increment(
//                     { 
//                         quantity: -(newOffersProductsData.quantity) 
//                     }, { 
//                         where: { 
//                             productId: newOrderOfferProduct.quantity
//                         }, 
//                         transaction: newTransaction 
//                     } 
//                 );
//                 // await Inventory.decrement("quantity", { by: newOrderOfferProduct.quantity, transaction: newTransaction })
//             });
//         }
        
//         if (!products) {
//             products.forEach(product => {
//                 product.orderId = newOrder.id
//             });

//             let newOrderProducts = await OrderProduct.bulkCreate(products, { transaction: newTransaction });

//             newOrderProducts.forEach(async orderProduct => {
//                 await Inventory.increment(
//                     { 
//                         quantity: -(orderProduct.quantity)
//                     }, {
//                         where: { 
//                             productId: orderProduct.productId 
//                         },
//                         transaction: newTransaction 
//                     }
//                 );
//             });
//         }
//         await newTransaction.commit();
//         return {
//             ...newOrder,
//             orderProducts: newOrderProducts,
//         }
//     } catch (e) {
//         console.log(e);
//         await newTransaction.rollback();
//         return null;
//     }
// }

exports.getOrder = async query => await Order
    .findOne({
        where: query,
        attributes: ["id", "status", "amount", "createdAt", "updatedAt"],
        include: [
            {
                model: OrderOffer,
                attributes: ["id", "quantity", "pricePerUnit", "totalPrice"],
                include: [
                    {
                        model: Offer,
                        attributes: ["id", "name", "slug", "image"]
                    },
                    {
                        model: OrderOfferProduct,
                        attributes: ["id", "quantity"],
                        include: [
                            {
                                model: Product,
                                attributes: ["id", "name", "slug", "image"]
                            },
                            {
                                model: OrderProductColor,
                                attributes: ["id", "size", "quantity"],
                                include: {
                                    model: ProductColor,
                                    attributes: ["id", "name"]
                                }
                            }
                        ]
                    }
                ]
            },
            {
                model: OrderProduct,
                attributes: ["quantity", "pricePerUnit", "totalPrice"],
                include: [
                    {
                        model: Product,
                        attributes: ["id", "name", "slug", "image"]
                    },
                    {
                        model: OrderProductColor,
                        attributes: ["id", "quantity", "size"],
                        include: {
                            model: ProductColor,
                            attributes: ["id", "name"]
                        }
                    }
                ]
            },
            {
                model: Address,
                attributes: ["id", "firstZone", "secondZone"], 
                include: [
                    {
                        model: City,
                        attributes: ["id", "name", "shippingCost", "ShippingTime"]
                    },
                    {
                        model: Governorate,
                        attributes: ["id", "name"]
                    }
                ]
            },
            {
                model: Shipping,
                attributes: ["id", "startShippingAt", "endShippingWithin", "shippingCost"]
            }
        ]
    });
