let { Shipping} = require("../../models");

exports.createShipping = async (newData, transaction) => await Shipping.create(newData, { transaction });

exports.getOrderShipping = async query => await Shipping
    .findOne({
        where: query,
        attributes: ["id", "startShippingAt", "endShippingWithin",	"shippingCost"]
    });

exports.updateOrderShipping = async (query, newData) => {
    let updateShipping = await Shipping.update(newData, { where: query });

    return updateShipping[0] === 1 ? true : false;
}
