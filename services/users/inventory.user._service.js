let { Inventory } = require("../../models");

exports.getInventoryProduct = async query => await Inventory.findAll({ where: query });

exports.decrementInventory = async (query, quantity, transaction) => {
    try {
        let inventory = await Inventory.findOne({ where: query , attributes: ["quantity"]});
        
        if (inventory.quantity < quantity || (inventory.quantity - quantity) <= 0) 
            return false;
        
        await Inventory.increment('quantity', { by: -quantity , where: query, transaction: transaction, validator: true});
    
        return true;
    } catch (error) {
        
        return false;
    }
}