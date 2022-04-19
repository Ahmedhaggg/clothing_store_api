let productAdminService = require("../../services/admin/product.admin._service");
let slugify = require("slugify");
let fs = require("fs");
let { UPLOADSDIR } = require("../../config/index");
const path = require("path");

exports.index = async (req, res, next) => {
    let { active, name } = req.query;

    let query = {}
    
    query.active = active === false ? false : true;
    
    req.query.name ? (query.name = name) : false;
    
    let products = await productAdminService.getProdutcts(query);

    return res.status(200).json({ 
        success: true,
        products 
    });
}

exports.show = async (req, res, next) => {
    let { id } = req.params;

    let product = await productAdminService.getProduct({ id });

    if (!product) 
        return res.status(404).json({ 
            success: false, 
            message: "product is not found "
        });
    
    res.status(200).json({ 
        success: true, 
        product 
    });
}

exports.store = async (req, res, next) => {
    let image = req.file.filename;
    
    let { name, price, description, categoryId, subcategoryId, discount, productDetails } = req.body;

    let slug = slugify(name);
    
    productDetails = JSON.parse(colors);
    
    let newProduct = await productAdminService.createProduct(
        { name,slug,price, description, image, categoryId, subcategoryId }, 
        discount, 
        productDetails
    ); 
    
    res.status(200).json({
        success: true, 
        message: "product is added successfully", 
        product: newProduct 
    });
}

exports.update = async (req, res, next) => {
    let { id } = req.params;

    let { name, price, description, categoryId, subcategoryId } = req.body;

    let slug = slugify(name);

    let updateProduct = await productAdminService.updateProduct(
        { id }, 
        { name, slug, price, description, categoryId, subcategoryId }
    );
    
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
    let { id } = req.params;

    let image = req.file.filename;

    let lastProductData = await productAdminService.getSomeProductData({ id }, ["image"]);
    
    if (!lastProductData) 
        return res.status(404).json({ 
            success: false, 
            message: "product is not found" 
        });

    let updateProduct = await productAdminService.updateProduct({ id }, { image });

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

exports.active = async (req, res, next) => {
    let { id } = req.params;

    let activeProduct = await productAdminService.updateProduct({ id }, { active: true });
    
    if (activeProduct === true) 
        return res.status(200).json({ 
            success: true, 
            message: "product is active now" 
        }); 

    res.status(404).json({ 
        success: false, 
        message: "can't unactive unactive this product" 
    });
}

exports.unactive = async (req, res, next) => {
    let { id } = req.params;
    
    let unactiveProduct = await productAdminService.updateProduct({ id }, { active: false });
    
    if (unactiveProduct === true) 
        return res.status(200).json({ 
            success: true, 
            message: "product is unactive successfully" 
        }); 
    
    res.status(404).json({ 
        success: false, 
        message: "can't unactive this product" 
    });
}
