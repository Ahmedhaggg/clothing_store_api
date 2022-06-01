let productService = require("../../services/users/product.user._service");
let BuildFilterProductQuery = require("../../helpers/buildFilterProductsQuery");


exports.index = async (req, res, next) => {
    let query = req.query;
    
    if (Object.keys(query).length === 0) {
        let products = await productService.getIndexProducts();
       
        return res.status(200).json({
            success: true,
            products
        })
    }

    let filterQuery = new BuildFilterProductQuery();
    
    query.limit ? filterQuery.setLimit(query.limit)
    : query.offset ? filterQuery.setOffset(query.offset)
    : query.name ? filterQuery.setName(query.name)
    : query.category ? filterQuery.setCategory(query.category)
    : query.subcategory ? filterQuery.setSubcategory(query.subcategory)
    : query.sort ? filterQuery.setSortBy(query.sort)
    : null;

    let products = await productService.getProductsByQuery(filterQuery.build())

    res.status(200).json({
        success: true,
        products
    });
}

exports.show = async (req, res, next) => {
    let { slug } = req.params;

    let product = await productService.getProduct({ slug });

    if (!product)
        return res.status(400).json({
            success: false,
            message: "product isn't found"
        });
   
    res.status(200).json({
        success: true,
        product
    })
}