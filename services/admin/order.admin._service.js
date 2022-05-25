let { Order, OrderOffer, Offer, OfferProducts, OrderOfferProduct, OrderProduct, Product, OrderProductColor, ProductColor, Address, City, Shipping, Shipper } = require("../../models");

exports.getOrders = async query => await Order.findAll({ where: query });

exports.getOrder = async query => await Order
    .findOne({
        where: query,
        include: [
            {
                model: OrderOffer,
                attributes: ["id", "quantity", "pricePerUnit", "totalPrice"],
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
                    },
                    {
                        model: Address,
                        attributes: ["id", "firstZone", "secondZone"],
                        include: [
                            {
                                model: City,
                                attributes: ["id", "name"]
                            },
                            {
                                model: City,
                                attributes: ["id", "name", "shippingTime", "shippingCost"]
                            }
                        ]
                    },
                    {
                        model: Shipping,
                        attributes: ["id","startShippingAt", "endShippingWithin", "shippingCost"],
                        include: {
                            model: Shipper,
                            attributes: ["id", "name"]
                        }
                    }
                ]
            }
        ]
    });

exports.updateOrder = async (query, newData, transaction) => {
    let updatedOrder = await Order.update(newData, { where: query, transaction });

    return updatedOrder[0] === 1 ? true : false;
}