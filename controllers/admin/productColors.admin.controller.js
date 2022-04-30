let productColorsServices = require("../../services/admin/productColors.admin._services");
let inventoryService = require("../../services/admin/inventory.admin._service")
exports.index = async (req, res, next) => {
    let { productId } = req.params;

    let productColors = await productColorsServices.getProductColors({ productId });

    res.status(200).json({
        success: true,
        productColors
    });
}

exports.create = async (req, res, next) => {
    let { productId, name, sizes } = req.body;
    
    let newProductColor = await productColorsServices.addColorToProduct({ productId, name});

    sizes.forEach(size => {
        size.colorId = newProductColor.id;
        size.productId = productId
    });

    let newColorSizes = await inventoryService.addProductColorSizesToInventory(sizes);
    
    res.status(201).json({
        success: true,
        message: "new color is add successfully",
        newColor: newProductColor,
        sizes: newColorSizes
    });
}