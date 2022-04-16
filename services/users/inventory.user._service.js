let { Inventory } = require("../../models");
exports.getInventoryProduct = async query => await Inventory.findAll({ where: query });
exports.decrementInventory = async (query, quantity, transaction) => {
    try {
        let inventory = await Inventory.findOne({ where: query , attributes: ["quantity"]});
                    console.log((inventory.quantity) - (quantity))

        if (inventory.quantity < quantity || (inventory.quantity) - (quantity) < 0) {
            console.log((inventory.quantity) - (quantity))
            return false;
        }
           

        let decre = await Inventory.increment('quantity', { by: quantity , where: query, transaction: transaction, validator: true});

        return decre === 0 ? false : true;
    } catch (error) {
        return false;
    }
}