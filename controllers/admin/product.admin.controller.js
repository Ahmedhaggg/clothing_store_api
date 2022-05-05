let productService = require("../../services/admin/product.admin._service");
let slugify = require("slugify");
let fs = require("fs");
let { UPLOADSDIR } = require("../../config/index");
const path = require("path");

exports.index = async (req, res, next) => {
    let { active, name } = req.query;

    let query = {};
    
    query.active = active === "false" ? false : true;
    
    req.query.name ? (query.name = name) : false;
    
    let products = await productService.getProdutcts(query);

    return res.status(200).json({ 
        success: true,
        products 
    });
}

exports.show = async (req, res, next) => {
    let { id } = req.params;

    let product = await productService.getProduct({ id });

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
    
    
    let newProduct = await productService.createProduct(
        { name,slug,price, description, image, categoryId, subcategoryId }, 
        discount || null, 
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

    let { name, price, description } = req.body;

    let slug = slugify(name);

    let updateProduct = await productService.updateProduct(
        { id }, 
        { name, slug, price, description }
    );
    
    if (updateProduct === false) 
        return res.status(404).json({ 
            success: false, 
            message: "product is not found to update" 
        }); 
    
    res.status(200).json({ 
        success: true, 
        message: "product is updated successfully" 
    }); 
}

exports.updateProductImage = async (req, res, next) => {
    let { id } = req.params;
    
    let image = req.file.filename;

    let lastProductData = await productService.getSomeProductData({ id }, ["image"]);
    
    if (!lastProductData) {
        await fs.unlinkSync(path.join(UPLOADSDIR, image));
        
        return res.status(404).json({ 
            success: false, 
            message: "product is not found" 
        });
    }

    let updateProduct = await productService.updateProduct({ id }, { image });

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

    let product = await productService.getSomeProductData({ id }, ["id", "active"])
    
    if (!product)
        return res.status(404).json({ 
            success: false, 
            message: "product is not found" 
        });

    if (product.active === true) 
        return res.status(404).json({ 
            success: false, 
            message: "product is actived arleady" 
        });

    await productService.updateProduct({ id }, { active: true });
    
    res.status(200).json({ 
        success: true, 
        message: "product is active successfully" 
    });
}

exports.unactive = async (req, res, next) => {
    let { id } = req.params;

    let product = await productService.getSomeProductData({ id }, ["id", "active"])
    
    if (!product)
        return res.status(404).json({ 
            success: false, 
            message: "product is not found" 
        });

    if (product.active === false) 
        return res.status(404).json({ 
            success: false, 
            message: "product is unactived arleady" 
        });

    await productService.updateProduct({ id }, { active: false });
    
    res.status(200).json({ 
        success: true, 
        message: "product is unactive successfully" 
    });
}
