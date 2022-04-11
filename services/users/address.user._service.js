let { Address, City, Governorate } = require("../../models");

exports.getUserAddresses = async query =>  await Address
    .findAll({ 
        where: query,
        attributes: ["id", "firstZone", "secondZone", "createdAt", "updatedAt"],
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
    });

exports.getAddress = async query =>  await Address
    .findOne({ 
        where: query,
        attributes: ["id", "firstZone", "secondZone", "createdAt", "updatedAt"],
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
    });


exports.createAddress = async newData => await Address.create(newData);


exports.updateAddress = async (query, newData) => {
    let updatedAddress = await Address.update(newData, { where: query });
    
    return updatedAddress[0] === 1 ? true : false;
}