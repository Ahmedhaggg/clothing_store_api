let { Shipper, Shipping, Order, Address, City, Governorate } = require("../../models");

exports.createShipper = async newData => await Shipper.create(newData);

exports.getAllShipper = async orderBy => await Shipper
    .findAll({ order: orderBy });

exports.getShipper = async query => await Shipper
    .findOne({
        where: query,
        include: {
            model: Shipping,
            attributes: [],
            include: {
                model: Order,
                attributes: [],
                include: {
                    model: Address,
                    attributes: ["id", "firstZone", "lastZone"],
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
    })