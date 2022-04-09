let { Offer, OfferProducts, Product, ProductColor, ProductDiscount, Inventory} = require("../../models");
let db = require("../../config/database");
const { Op, Sequelize } = require("sequelize");

exports.getAllOffers = async query => await Offer
    .findAll({
        where: query
    });
    


exports.createOffer = async (offerData, offerProductsData) => {
    let transaction = await db.transaction();

    try {
        let offer = await Offer.create(offerData, { transaction});

        offerProductsData.forEach(offerProductData => {
            offerProductData.offerId = offer.id;
        });

        let offerProducts = await OfferProducts.bulkCreate(offerProductsData, { transaction });

        await transaction.commit();
        return {
            offer,
            offerProducts
        };
    } catch (error) {
        await transaction.rollback()
        return null;
    }
}

exports.getOffer = async query => await Offer
    .findOne({
        where: query,
        attributes: ["id", "name", "active", "slug", "price", "image", "description", "expiresin"],
        include: [
            {
                model: OfferProducts,
                as: "offerProducts",
                attributes: ["id", "quantity"],
                include: [
                    {
                        model: Product,
                        attributes: ["id", "name", "slug", "price", "active", "image"],
                        include: {
                            required: false,
                            model: ProductColor,
                            as: "productColors",
                            attributes: ["id", "name"],
                            include: [
                                { 
                                    required: true,
                                    model: Inventory,    
                                    attributes: ["id", "size", "quantity"],
                                    where: {
                                        quantity: {
                                            [Op.gte]: 1
                                        }
                                    } 
                                }    
                            ]
                        }
                    }
                ]
            }
        ]
    });

exports.updateOffer = async (query, offerData) => {
    let updateOffer = await Offer.update(offerData, { where: query});

    return updateOffer[0] === 1 ? true : false;
}

exports.getSomeOfferData = async (query, fields) =>  await Offer
    .findOne({
        where: query,
        attributes: fields
    });

