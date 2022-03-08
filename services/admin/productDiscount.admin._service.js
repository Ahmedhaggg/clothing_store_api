let { ProductDiscount } = require("../../models/index");



exports.createDiscount = async (newData) => {
    let newDiscount = await ProductDiscount.create(newData);

    return newDiscount;
}
 
exports.updateDiscount = async (id, newData) => {
    let updatedDiscount = await ProductDiscount.update(newData, {
        where: { id }
    });

    return updatedDiscount[0] === 1 ? true : false; 
}

exports.deleteDiscount = async (id) => {
    let deletedDiscount = await ProductDiscount.destroy({
        where: { id }
    });

    return deletedDiscount == 1 ? true : false;
}