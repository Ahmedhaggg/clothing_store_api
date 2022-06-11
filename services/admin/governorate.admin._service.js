let { Governorate, City } = require("../../models");

exports.count = async () => await Governorate.count();

exports.getAllGovernorates = async () => await Governorate.findAll();

exports.getGovernorate = async query => await Governorate
    .findOne({ 
        where: query,
        include: {
            model: City,
            attributes: ["id", "name", "shippingCost", "ShippingTime"]
        }
    })

exports.createGovernorate = async newData => await Governorate.create(newData);

