let { Address } = require("../../models");

exports.getUserAddresses = async query => {
    let userAddress = await Address.findAll({ 
        where: query,
        attributes: ["id", "governorate", "city", "firstZone", "secondZone"] 
    });
    return userAddress
}

exports.getAddress = async query => {
    let address = await Address.findOne({ where: query });

    return address
}

exports.createAddress = async newData => {
    await Address.create(newData);
}

exports.updateAddress = async (query, newData) => {
    let updatedAddress = await Address.update(newData, { where: query });
    
    return updatedAddress[0] === 1 ? true : false;
}