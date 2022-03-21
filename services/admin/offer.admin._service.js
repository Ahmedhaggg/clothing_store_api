let { Offer, OfferProducts, Product, ProductColor, ProductDiscount, Inventory} = require("../../models");
let db = require("../../config/database");

exports.getAllOffers = async query => {
    let offers = await Offer.findAll({
        where: query
    })
    
    return offers;
}

exports.createOffer = async (offerData, offerProductsData) => {
    let transaction = await db.transaction();

    try {
        let offer = await Offer.create(offerData, { transaction});

        offerProductsData.forEach(offerProductData => {
            offerProductData.offerId = offer.id;
        });

        await OfferProducts.bulkCreate(offerProductsData, { transaction });

        await transaction.commit();
        return true;
    } catch (error) {
        await transaction.rollback()
        return false;
    }
}

exports.getOffer = async query => {
    let offer = await Offer.findOne({
        where: query,
        include: [
            {
                model: OfferProducts,
                include: [
                    {
                        model: Product,
                        include: [
                            {
                                model: ProductColor
                            },
                            {
                                model: ProductDiscount
                            },
                            {
                                model: Inventory
                            }
                        ]
                    }
                ]
            }
        ]
    });

    return offer;
}

exports.updateOffer = async (query, offerData) => {
    let updateOffer = await Offer.update(offerData, { where: query});

    return updateOffer[0] === 1 ? true : false;
}

exports.getSomeOfferData = async (query, fields) => {
    let offer = await Offer.findOne({
        where: query,
        attributes: fields
    });

    return offer;
}

