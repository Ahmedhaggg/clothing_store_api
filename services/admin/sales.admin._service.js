let { Order, User, Address, City, OrderProduct, OrderOffer, Governorate, OrderOfferProduct, OrderProductColor, Product, ProductColor, Offer } = require("../../models");

exports.getSales = async (offset = 0, limit = 20) => await Order
    .findAll({
        where: { 
            status: "completed"
        },
        attributes: ["id", "amount", "createdAt", ["updatedAt", "completedAt" ]],
        offset,
        limit,
        include: [
            {
                model: User,
                attributes: ["id", "userName"]
            }
        ]
    });


exports.getOneSales = async query => await Order
    .findOne({
        where: { 
            status: "completed",
            ...query
        },
        attributes: ["id", "amount", "createdAt", ["updatedAt", "completedAt" ]],
        include: [
            {
                model: User,
                attributes: ["id", "userName"]
            },
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
                        model: Governorate,
                        attributes: ["id", "name"]
                    },
                    {
                        model: City,
                        attributes: ["id", "name", "shippingTime", "shippingCost"]
                    }
                ]
            }
        ]
    });


exports.createSales = async query => {
    let updateOrder = await Order.update({ status: "completed"}, {
        where: {
            status: "shipped",
            ...query,
        }
    });
    console.log(updateOrder)
    return updateOrder[0] === 1 ? true : false;
}

