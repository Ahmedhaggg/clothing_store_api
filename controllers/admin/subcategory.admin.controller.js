let subcategoryAdminService = require("../../services/admin/subcategory.admin_service")
let slugify = require("slugify");


exports.store = async (req, res, next) => {
    let { name, categoryId } = req.body;
    let slug = slugify(name);

    let newSubcategory = await subcategoryAdminService.createSubcategory({name, slug, categoryId});
    
    res.status(201).json({
        success: true,
        message: "subcategory is created successfully",
        newSubcategory
    });
}

exports.show = async (req, res, next) => {
    let { id } = req.params;

    let category = await subcategoryAdminService.getSubcategory(id);

    if (!category) 
        return res.status(404).json({
            success: false,
            message: "category is not found"
        });
    
    res.status(200).json({
        success: true,
        category
    });
    
}

exports.update = async (req, res, next) => {
    let { id } = req.params;
    let { name } = req.body;
    let slug = slugify(name);
    
    let updateSubcategory = await subcategoryAdminService.updateSubcategory(id ,{name, slug});

    if (updateSubcategory === false) 
        return res.status(401).json({
            success: false,
            message: `can't find subcategory with this ${id}`
        });

    res.status(201).json({
        success: true,
        message: "subcategory is updated successfully"
    });
}    