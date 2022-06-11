let { Shipper, Shipping, Order, Address, City, Governorate } = require("../../models");

exports.count = async query => await Shipper.count({ where: query });

exports.createShipper = async newData => await Shipper.create(newData);

exports.getAllShipper = async query => await Shipper
    .findAll({ where: query });

exports.getShipper = async query => await Shipper
    .findOne({
        where: query,
        include: {
            model: Shipping,
            attributes: ["id", "startShippingAt", "endShippingWithin"],
            include: {
                model: Order,
                attributes: ["id"],
                include: {
                    model: Address,
                    attributes: ["id", "firstZone", "secondZone"],
                    include: [
                        {
                            model: City,
                            attributes: ["name"]
                        },
                        {
                            model: Governorate,
                            attributes: ["name"]
                        }
                    ]
                }
            }
        }
    });

exports.updateShipper = async (query, newData, transaction) => {
    let updatedShipper = await Shipper.update(newData, 
        { 
            where: {
                status: "available",
                ...query
            },
        transaction 
    });

    return updatedShipper[0] === 1 ? true : false;
}