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

exports.update = async (req, res, next) => {
    let { productId } = req.params
    let { name, price, description, categoryId, subcategoryId } = req.body;
    let slug = slugify(name);

    let updateProduct = await productAdminService.updateProduct(productId, {
        name,
        slug,
        price,
        description, 
        categoryId, 
        subcategoryId
    });
    
    if (updateProduct === false)
        return res.status(404).json({
            success: false,
            message: "can't update this product, verify from data"
        }); 

    res.status(200).json({
        success: true,
        message: "product is updated successfully"
    }); 
}

exports.updateProductImage = async (req, res, next) => {
    let { productId } = req.params;
    let image = req.file.filename;

    let lastProductData = await productAdminService.getSomeProductData(productId, ["image"]);
    
    if (!lastProductData) 
        return res.status(404).json({
            success: false,
            message: "product is not found"
        });

    let updateProduct = await productAdminService.updateProduct(productId, { image });

    if (updateProduct === false) {
        await fs.unlinkSync(path.join(UPLOADSDIR, image));
        return res.status(404).json({
            success: false,
            message: "can't update image of this product now"
        }); 
    }

    await fs.unlinkSync(path.join(UPLOADSDIR, lastProductData.image));

    res.status(200).json({
        success: true,
        message: "product image is updated successfully"
    });

}

/*
*   delete => update product and make active = false 
*/
exports.active = async (req, res, next) => {
    let { productId } = req.params;

    let activeProduct = await productAdminService.updateProduct(productId, { active: true });
    
    if (activeProduct === true) {
        return res.status(200).json({
            success: true,
            message: "product is active now"
        }); 
    }

    res.status(404).json({
        success: false,
        message: "can't unactive unactive this product"
    });
}

exports.unactive = async (req, res, next) => {
    let { productId } = req.params;
    
    let unactiveProduct = await productAdminService.updateProduct(productId, { active: false });
    
    if (unactiveProduct === true) {
        return res.status(200).json({
            success: true,
            message: "product is unactive successfully"
        }); 
    }

    res.status(404).json({
        success: false,
        message: "can't unactive this product"
    });
}
