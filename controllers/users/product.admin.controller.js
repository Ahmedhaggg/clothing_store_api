let productService = require("../../services/users/product.user._service");
let BuildFilterProductQuery = require("../../helpers/buildFilterProductsQuery");
exports.index = async (req, res, next) => {
    let queryString = req.query;
    
    if (!queryString) {
        let products = await productService.getIndexProducts();
        return res.status(200).json({
            success: true,
            products
        })
    }

    let filterQuery = new BuildFilterProductQuery();
    
    if (queryString.limit) 
        filterQuery.setLimit(queryString.limit);
    if (queryString.offset)
        filterQuery.setOffset(queryString.offset);
    if (queryString.name)
        filterQuery.setName(queryString.name);
    if (queryString.category)
        filterQuery.setCategory(queryString.category);
    if (queryString.subcategory)
        filterQuery.setSubcategory(queryString.subcategory);
    if (queryString.sort)
        filterQuery.setSubcategory(queryString.sort);

    let products = await productService.getSomeProducts(filterQuery.build())

    if (products.length === 0)
        res.status(400).json({
            success: false,
            message: "can't find any product with this requirements"
        })
    else
        res.status(200).json({
            success: true,
            products
        })
}

exports.show = async (req, res, next) => {
    let { slug } = req.params;

    let product = await productService.getProduct({ slug });

    if (!product)
        res.status(400).json({
            success: false,
            message: "product isn't found"
        })
    else 
        res.status(200).json({
            success: true,
            product
        })
}