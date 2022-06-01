let { User, Order, OfferReview, Product, Offer, ProductReview } = require("../../models");

exports.getUsers = async query => await User
    .findAll({
        where: query,
        attributes: ["id", "userName", "firstName", "lastName", "email", "phoneNumber", "lastLogin"]
    });

exports.getUser = async query => {
    let userData = await User.findOne({
        where: query,
        attributes: ["id", "userName", "firstName", "lastName", "email", "phoneNumber", "lastLogin"],
        include: [
            {
                model: Order,
                attributes: ["id", "amount", "createdAt", "paymentId"],
            },
            {
                model: OfferReview,
                attributes: ["id", 'ratings', "comment"],
                include: {
                    model: Offer,
                    attributes: ["id", "name"]
                }
            },
            {
                model: ProductReview,
                attributes: ["id", 'ratings', "comment"],
                include: {
                    model: Product,
                    attributes: ["id", "name"]
                }
            }
        ]
    });

    let { 
        id, 
        userName,
        firstName, 
        lastName,
        email,
        phoneNumber,
        lastLogin,
        productReviews,
        OfferReviews
    } = userData;

    let orders = userData.orders.filter(order => order.status !== "completed");
    let purchases = userData.orders.filter(order => order.status === "completed");

    return {
        id, 
        userName,
        firstName, 
        lastName,
        email,
        phoneNumber,
        lastLogin,
        productReviews,
        OfferReviews,
        orders,
        purchases
    };
}
exports.deleteUser = async query => {
    let deletedUser = await User.destroy({ where: query });
    return deletedUser === 1 ? true : false; 
}