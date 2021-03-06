let { ProductDiscount } = require("../../models/index");

exports.getDiscount = async query => await ProductDiscount
    .findOne({
        where: query,
        attributes: ["id", "percent", "description", "expiresin", "createdAt", "updatedAt", "productId"]    
    })
exports.createDiscount = async (newData) => await ProductDiscount.create(newData);
 
exports.updateDiscount = async (query, newData) => {
    let updatedDiscount = await ProductDiscount.update(newData, {
        where: query
    });

    return updatedDiscount[0] === 1 ? true : false;
}

exports.deleteDiscount = async query => {
    let deletedDiscount = await ProductDiscount.destroy({
        where: query
    });

    return deletedDiscount == 1 ? true : false;
}