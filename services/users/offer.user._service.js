const { Op } = require("sequelize");
const db = require("../../config/database");
let { Offer, OfferProducts, Product, Inventory, ProductColor } = require("../../models");

exports.getOffers = async () => await Offer
    .findAll({
        attributes: ["id", "name", "slug", "price", "image", "expiresin"],
        where: {
            active: true,
            expiresin: {
                [Op.gte]: new Date()
            }
        },
        include: {
            required: true,
            model: OfferProducts,
            attributes: ["quantity"],
            as: "offerProducts",
            include: {
                required: true,
                model: Product,
                attributes: ["id", "name"],
                where: {
                    active: true
                },
                include: {
                    required: true,
                    model: ProductColor,
                    as: "productColors", 
                    attributes: ["name"],
                    include: {
                        required: true,
                        model: Inventory,
                        attributes: ["size"],
                        where: {
                            quantity: {
                                [Op.gte]: db.col("offerProducts.quantity") 
                            }
                        }
                    }
                }
            }
        },

    });

exports.getOffer = async query => {
    let product = await Offer.findAll({
        where: query,
        attributes: ["id", "name", "slug", "price", "image", "description", "expiresin"],
        where: {
            active: true,
            expiresin: {
                [Op.gte]: new Date()
            }
        },
        include: {
            required: true,
            model: OfferProducts,
            attributes: ["id", "quantity"],
            as: "offerProducts",
            include: {
                required: true,
                model: Product,
                attributes: ["id", "name", "slug", "image"],
                where: {
                    active: true
                },
                include: {
                    required: true,
                    model: ProductColor,
                    as: "productColors", 
                    attributes: ["id", "name"],
                    include: {
                        required: true,
                        model: Inventory,
                        attributes: ["id", "size"],
                        where: {
                            quantity: {
                                [Op.gte]: db.col("offerProducts.quantity") 
                            }
                        }
                    }
                }
            }
        }
    });
    return product[0];
}