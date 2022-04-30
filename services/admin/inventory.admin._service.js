let { Inventory } = require("../../models/index");

exports.addProductColorSizesToInventory = async newData => Inventory.bulkCreate(newData)

exports.updateIneventory = async (query, newData) => {
    let updatedInventory = await Inventory
    .update(newData, {
        where: query
    });

    return updatedInventory[0] === 1 ? true : false;
}