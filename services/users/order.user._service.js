let { Inventory, Order, OrderOffer, OrderProduct, OrderOfferProduct, Shipping, Offer, Product, ProductDiscount, Address } = require("../../models");
let db = require("../../config/database");
exports.getUserOrders = async query => await Order   
    .findOne({
        where: query,
        include: [
            {
                model: Shipping
            }
        ]
    });
 

exports.createOrder = async (order, offers = null, offersProducts = null, products = null) => {
    let newTransaction = await db.transaction();
    try {
        let newOrder = await Order.create(order, { transaction: newTransaction });

        if (offers) {
            offers.forEach(offerData => {
                offerData.orderId = newOrder.id;
            });

            let newOrderOffers = await OrderOffer.bulkCreate(offers, { transaction: newTransaction });
            
            let newOffersProductsData = offersProducts.map(offerProduct => {
                let offer = newOrderOffers.findOne(orderOffer => orderOffer.offerId === offerProduct.offerId);
                return {
                    productId: offerProduct.id,
                    quantity: offerProduct.quantity,
                    colors: offerProduct.colors,
                    orderOfferId: offer.id
                }
            })

            
            let newOrderOffersProducts = await OrderOfferProduct.bulkCreate(newOffersProductsData, { transaction: newTransaction });

            newOrderOffersProducts.forEach(async newOrderOfferProduct => {
                await Inventory.increment(
                    { 
                        quantity: -(newOffersProductsData.quantity) 
                    }, { 
                        where: { 
                            productId: newOrderOfferProduct.quantity
                        }, 
                        transaction: newTransaction 
                    } 
                );
                // await Inventory.decrement("quantity", { by: newOrderOfferProduct.quantity, transaction: newTransaction })
            });
        }
        
        if (!products) {
            products.forEach(product => {
                product.orderId = newOrder.id
            });

            let newOrderProducts = await OrderProduct.bulkCreate(products, { transaction: newTransaction });

            newOrderProducts.forEach(async orderProduct => {
                await Inventory.increment(
                    { 
                        quantity: -(orderProduct.quantity)
                    }, {
                        where: { 
                            productId: orderProduct.productId 
                        },
                        transaction: newTransaction 
                    }
                );
            });
        }
        await newTransaction.commit();
        return {
            ...newOrder,
            orderProducts: newOrderProducts,
        }
    } catch (e) {
        console.log(e);
        await newTransaction.rollback();
        return null;
    }
}

exports.getOrder = async query => await Order
    .findOne({
        where: query,
        attributes: ["id", "status", "amount"],
        include: [
            {
                model: OrderOffer,
                include: [
                    {
                        model: Offer
                    },
                    {
                        model: OrderOfferProduct,
                        include: [
                            {
                                model: Product,
                                attributes: ["name", "slug", "image"]
                            }
                        ]
                    }
                ]
            },
            {
                model: OrderProduct,
                attributes: ["id"],
                include: [
                    {
                        model: Product,
                        attributes: ["name", "slug", "image"],
                        include: [
                            {
                                model: ProductDiscount
                            }
                        ]
                    }
                ]
            },
            {
                model: Address
            },
            {
                model: Shipping
            }
        ]
    });
