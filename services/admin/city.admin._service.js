let { City, Governorate } = require("../../models");

exports.getAllCities = async () => await City
    .findAll({ 
        include: [{ 
            model: Governorate,
            attributes: ["name"]
        }]
    });

exports.getCity = async query =>  await City
    .findOne({ 
        where: query,
        attributes: ["id", "name", "shippingCost", "shippingTime"],
        include: [{ 
            model: Governorate,
            attributes: ["name"]
        }]
    });


exports.createCity = async newData =>  await City.create(newData);


exports.updateCity = async (query, newData) => {
    let updatedCity = await City.update(newData, { where: query });

    return updatedCity[0] === 1 ? true : false;
}

