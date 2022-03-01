let productAdminService = require("../../services/admin/product.admin._service");
let slugify = require("slugify");
let fs = require("fs");
let { UPLOADSDIR } = require("../../config/index");
const path = require("path");

exports.index = async (req, res, next) => {
    let products = await productAdminService.getAllActiveProducts();
    res.status(200).json({
        success: true,
        products
    });
}

exports.store = async (req, res, next) => {
    let image = req.file.filename;
    
    let { name, price, description, categoryId, subcategoryId, quantity, discountExpiresin, discountPercent, discountDescription, colors } = req.body;

    let slug = slugify(name);
    
    colors = JSON.parse(colors);
    
    let newProduct = await productAdminService.createProduct(
        {
            name,
            slug,
            price,
            description,
            image,
            categoryId,
            subcategoryId
        },
        {
            expiresin: discountExpiresin,
            percent: discountPercent,
            description: discountDescription
        },
        {
            quantity
        },
        colors
    );
    
    if (newProduct === true) 
        return res.status(200).json({
            success: true,
            message: "product is added successfully"
        });

    await fs.unlinkSync(path.join(UPLOADSDIR, image));

    res.status(500).json({
        success: false,
        message: "faild to add product",
        error: newProduct
    })
}

