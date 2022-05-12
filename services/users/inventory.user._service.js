let { Inventory } = require("../../models");

exports.getInventoryProduct = async query => await Inventory.findAll({ where: query });

exports.decrementInventory = async (query, quantity, transaction) => {
    try {
        let inventory = await Inventory.findOne({ where: query , attributes: ["quantity"], transaction });
        
        if (inventory.quantity < quantity || (inventory.quantity - quantity) < 0) 
            return false;
        
        await Inventory.update({ quantity: inventory.quantity - quantity }, { where: query , transaction });
            
        return true;
    } catch (error) {
        
        return false;
    }
}