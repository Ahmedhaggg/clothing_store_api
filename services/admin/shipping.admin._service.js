let { Shipper, Shipping, Order, Address, City, Governorate } = require("../../models");

exports.createShipping = async newData => await Shipper.create(newData);

exports.getOrderShipping = async query => await Shipping
    .findOne({
        where: query,
        attributes: ["id", "startShippingAt", "endShippingWithin",	"shippingCost"]
    });

exports.updateOrderShipping = async (query, newData) => {
    let updateShipping = await Shipping.update(newData, { where: query });

    return updateShipping[0] === 1 ? true : false;
}