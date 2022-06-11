const { Op } = require("sequelize");
let { User, Order, OfferReview, Product, Offer, ProductReview, EmailVerification } = require("../../models");

exports.count = async () => await User.count();

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

exports.getUsersLoggedMonthAgo = async () => await User
    .findAll({
        attributes: ["id", "email", "firstName"],
        where: {
            lastLogin: {
                [Op.gte]: moment().subtract(30, 'days').toDate()
            }
        }
    });

exports.getAllAnonymousUsers = async () => await User
    .findAll({
        where: {
            verified: false
        },
        attributes: ["id"],
        include: {
            model: EmailVerification,
            where: {
                createdAt: {
                    [Op.gte]: moment().subtract(1, 'days').toDate()
                }
            }
        }
    })

