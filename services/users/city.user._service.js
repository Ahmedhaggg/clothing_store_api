let { City } = require("../../models");

exports.getCity = async query => City
    .findOne({
        where: query,
        attributes: ["id", "name", ["shippingTime" , "shippingThrough"], "shippingCost"]
    })