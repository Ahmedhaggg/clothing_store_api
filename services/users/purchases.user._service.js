const { Order, OrderProduct, OrderOffer } = require("../../models");

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