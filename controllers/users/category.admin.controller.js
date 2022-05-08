let categoryService = require("../../services/users/category.user._service");

exports.index = async (req, res, next) => {
    let categoriesNames = await categoryService.getAllCategories();

    return res.status(200).json({
        success: true,
        categories: categoriesNames
    });
}

exports.show = async (req, res, next) => {
    let { slug } = req.params;
    
    let category = await categoryService.getSubcategoriesOfcategory({ slug })

    if (!category)
        return res.status(400).json({
            success: false,
            message: "category is not found"
        });
     
    res.status(200).json({
        success: true,
        category
    })
}
