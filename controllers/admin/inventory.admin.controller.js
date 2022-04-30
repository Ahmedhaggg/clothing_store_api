let inventoryService = require("../../services/admin/inventory.admin._service");

exports.update = async (req, res, next) => {
    let { id } = req.params;
    let { quantity } = req.body;
    
    let updateProductQuantity = await inventoryService.updateIneventory({ id }, { quantity });
    
    if(updateProductQuantity === false) 
        return res.status(404).json({
            success: false,
            message: "nothing to update"
        }); 
    
    res.status(200).json({
        success: true,
        message: "quantity of product is update successfully"
    });
}
