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
                attributes: ["id", "amount", "createdAt", "paymentId", "status"],
            },
            {
                model: OfferReview,
                attributes: ["id", 'rating', "comment"],
                include: {
                    model: Offer,
                    attributes: ["id", "name"]
                }
            },
            {
                model: ProductReview,
                attributes: ["id", 'rating', "comment"],
                include: {
                    model: Product,
                    attributes: ["id", "name"]
                }
            }
        ]
    });
    console.log(userData)
    let { 
        id, 
        userName,
        firstName, 
        lastName,
        email,
        phoneNumber,
        lastLogin,
        product_reviews,
        offer_reviews
    } = userData;
    
    let orders = userData.orders.filter(order => order.status !== "completed");
    let sales = userData.orders.filter(order => order.status === "completed");

    return {
        id, 
        userName,
        firstName, 
        lastName,
        email,
        phoneNumber,
        lastLogin,
        productReviews: product_reviews,
        offerReviews: offer_reviews,
        orders,
        sales
    };
}
exports.deleteUser = async query => {
    let deletedUser = await User.destroy({ where: query });
    return deletedUser === 1 ? true : false; 
}