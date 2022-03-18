let productColorsServices = require("../../services/admin/productColors.admin._services");

exports.show = async (req, res, next) => {
    let { productId } = req.params;

    let productColors = await productColorsServices.getColors({ productId });

    res.status(200).json({
        success: true,
        productColors
    });
}

exports.create = (req, res, next) => {
    let { productId, name } = req.body;

    let newProductColor = await productColorsServices.createColor({ productId, name});

    res.status(201).json({
        success: true,
        message: "new color is add successfully",
        newColor: newProductColor
    });
}

exports.update = (req, res, next) => {
    let { colorId } = req.params;
    let { name } = req.body;

    await productColorsServices.updateColors(colorId, { name });

    res.status(200).json({
        success: true,
        message: "product color is updated"
    })
}

exports.destroy = async (req, res, next) => {
    let { colorId } = req.params;

    await productColorsServices.deleteColors(colorId);

    res.status(200).json({
        success: true,
        message: "product color is deleted successfully"
    })
}
