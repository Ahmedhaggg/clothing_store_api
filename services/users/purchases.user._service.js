const { Order, OrderProduct, OrderOffer,Offer, OrderOfferProduct, OrderProductColor, Product, ProductColor } = require("../../models");

exports.getUserPurchases = async query => await Order
    .findAll({
        where: { 
            status: "completed",
            ...query
        },
        attributes: ["id", "amount", "createdAt", ["updatedAt", "completedAt" ]]
    });

exports.getOnePurchases = async query => await Order
    .findOne({
        where: { 
            status: "completed",
            ...query
        },
        attributes: ["id", "amount", "createdAt", ["updatedAt", "completedAt" ]],
        include: [
            {
                model: OrderProduct,
                attributes: ['id', "quantity", "pricePerUnit", "totalPrice"],
                include: [
                    {
                        model: Product,
                        attributes: ["id", "name", "price", "image"]
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
                model: OrderOffer,
                attributes: ["id", "quantity", "pricePerUnit", "totalPrice"],
                include: [
                    {
                        model: Offer,
                        attributes: ["id", "name", "price", "image"]
                    },
                    {
                        model: OrderOfferProduct,
                        attributes: ["id", "quantity"],
                        include: [
                            {
                                model: Product,
                                attributes: ["id", "name", "price", "image"]
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
                    }
                ]
            }
        ]
    });



exports.checkProductInUserPurchases = async query => await Order
    .findOne({
        where: { userId: query.userId, status: "completed"},
        attributes: ["id"],
        include: {
            model: OrderProduct,
            required: true,
            where: { productId: query.productId }
        }
    });

exports.checkOfferInUserPurchases = async query => Order
    .findOne({
        where: { userId: query.userId, status: "completed"},
        attributes: ["id"],
        include: {
            model: OrderOffer,
            required: true,
            where: { offerId: query.offerId }
        }
    });