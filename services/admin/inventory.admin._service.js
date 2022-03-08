let { Inventory } = require("../../models/index");

exports.updateIneventory = async (id, newData) => {
    let updatedInventory = await Inventory.update(newData, {
        where: { id }
    });

    return updatedInventory[0] === 1 ? true : false;
}