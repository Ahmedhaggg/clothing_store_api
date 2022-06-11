let subcategoryService = require("../../services/admin/subcategory.admin_service")
let slugify = require("slugify");


exports.count = async (req, res, next) => {
    let numberOfSubcategories = await subcategoryService.count();
    
    res.status(200).json({
        success: true,
        numberOfSubcategories
    });
}

exports.index = async (req, res, next) => {
    let subcategories = await subcategoryService.getAllSubcategories();

    res.status(200).json({
        success: true,
        subcategories
    });
} 
exports.store = async (req, res, next) => {
    let { name, categoryId } = req.body;
    let slug = slugify(name);

    let newSubcategory = await subcategoryService.createSubcategory({name, slug, categoryId});
    
    res.status(201).json({
        success: true,
        message: "subcategory is created successfully",
        newSubcategory
    });
}

exports.show = async (req, res, next) => {
    let { id } = req.params;

    let subcategory = await subcategoryService.getSubcategory({ id });

    if (!subcategory) 
        return res.status(404).json({
            success: false,
            message: "category is not found"
        });
    
    res.status(200).json({
        success: true,
        subcategory
    });
    
}

exports.update = async (req, res, next) => {
    let { id } = req.params;
    let { name } = req.body;
    let slug = slugify(name);
    
    let updateSubcategory = await subcategoryService.updateSubcategory({ id } , { name, slug });

    if (updateSubcategory === false) 
        return res.status(404).json({
            success: false,
            message: `subcategory is not found`
        });

    res.status(201).json({
        success: true,
        message: "update subcategory successfully"
    });
}    