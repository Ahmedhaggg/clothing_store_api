let { Inventory } = require("../../models");

exports.getInventoryProduct = async query => await Inventory.findAll({ where: query });

exports.decrementInventory = async (query, quantity, transaction) => {
    try {
        await Inventory.increment('quantity', { by: -quantity , where: query, transaction });
        
        let inventory = await Inventory.findOne({ where: query , attributes: ["quantity"], transaction });
        
        return inventory.quantity < 0 ? false : true;
    } catch (_) {
        return false;
    }
}