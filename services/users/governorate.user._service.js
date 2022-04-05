let { Governorate, City } = require("../../models");

exports.getAllGovernorates = async () => await Governorate.findAll();

exports.getGovernorate = async query => await Governorate
    .findOne({ 
        where: query,
        include: {
            model: City,
            attributes: ["id", "name"]
        }
    });