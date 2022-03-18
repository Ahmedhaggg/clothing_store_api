let categoryService = require("../../services/users/category.user._service");

exports.index = async (req, res, next) => {
    let categoriesNames = await categoryService.getCategoriesNames();
    return res.status(200).json({
        success: true,
        categoriesNames
    })
}

exports.show = async (req, res, next) => {
    let { slug } = req.params;
    
    let category = await categoryService.getCategoryProducts({ slug })

    if (!category)
        res.status(400).json({
            success: false,
            message: "category is not found"
        });
    else 
        res.status(200).json({
            success: true,
            category
        })
}
