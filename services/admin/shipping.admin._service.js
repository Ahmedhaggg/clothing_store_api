let { Shipping, Shipper, Order, Address, Governorate, City, User} = require("../../models");

exports.createShipping = async (newData, transaction) => await Shipping.create(newData, { transaction });

exports.getOrderShipping = async query => await Shipping
    .findOne({
        where: query,
        attributes: ["id", "startShippingAt", "endShippingWithin"]
    });

exports.count = async () => await Shipping.count();

exports.getAllShipping = async (offset = 10, limit = 10, sort = "desc") => await Shipping
    .findAll({
        offset, 
        limit,
        order: [ (sort === "asc" ? ["startShippingAt", "ASC"] : ["startShippingAt", "DESC"] ) ] 
    });

exports.getShipping = async query => await Shipping
    .findOne({
        where: query,
        attributes: ["id", "startShippingAt", "endShippingWithin"],
        include: [
            {
                model: Shipper,
                attributes: ["id", "name"]
            },
            {
                model: Order,
                attributes: ["id", "amount"],
                include: [
                    {
                        model: Address,
                        attributes: ["id", "firstZone", "secondZone"],
                        include: [
                            {
                                model: Governorate,
                                attributes: ["id", "name"]
                            },
                            {
                                model: City,
                                attributes: ["id", "name"]
                            }
                        ]
                    }, 
                    {
                        model: User,
                        attributes: ["id", "userName", "email", "phoneNumber"]
                    }
                ]
            }
        ]
    })
exports.updateOrderShipping = async (query, newData) => {
    let updateShipping = await Shipping.update(newData, { where: query });

    return updateShipping[0] === 1 ? true : false;
}
exports.deleteShipping = async query => {
    let deletedShipping = await Shipping.destroy({
        where: query
    });

    return deletedShipping === 1 ? true : false;
}