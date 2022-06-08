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
                    as: "colors", 
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


exports.getOffer = async query => await Offer
    .findOne({
        where: {
            active: true,
            ...query
        },
        attributes: ["id", "name", "slug", "price", "image", "description", "expiresin"],
        include: [
            {
                required: true,
                model: OfferProducts,
                as: "offerProducts",
                attributes: ["quantity"],
                include: [
                    {
                        required: true,
                        model: Product,
                        attributes: ["id", "name", "slug", "image"],
                        where: {
                            active: true
                        },
                        include: [
                            {
                                required: true,
                                model: ProductColor,
                                attributes: ["id", "name"],
                                as: "colors",
                                include: [
                                    {
                                        required: true,
                                        model: Inventory,
                                        attributes: ["id", "size", "quantity"],
                                        where: {
                                            quantity: {
                                                [Op.gte]: db.col("offerProducts.quantity") 
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
                
            }
        ]
    })