let { OfferProducts } = require("../../models");

exports.createOfferProduct = async offerProductData => {
    await OfferProducts.create(offerProductData);
}

exports.updateOfferProduct = async (query, newData) => {
    let updateProduct = await OfferProducts.update(newData, { where: query});

    return updateProduct[0] === 0 ? false : true;
}

exports.deleteOfferProduct = async query => {
    let deleteProduct = await OfferProducts.destroy({ where: query });

    return deleteProduct === 0 ? false : true;
}
