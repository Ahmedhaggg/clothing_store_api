let inventoryService = require("../../services/admin/inventory.admin._service");

exports.update = async (req, res, next) => {
    let { id } = req.parmas;
    let { quantity } = req.body;

    let updateProductQuantity = await inventoryService.update(id, { quantity });
    
    if(updateProductQuantity === false) 
        return res.status(404).json({
            success: false,
            message: "can't update product now"
        });
    
    res.status(400).json({
        success: true,
        message: "quantity of product is update successfully"
    });
}
