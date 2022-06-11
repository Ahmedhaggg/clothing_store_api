let categoryAdminService = require("../../services/admin/category.admin._service");
let slugify = require("slugify");

exports.count = async (req, res, next) => {
    let numberOfCategories = await categoryAdminService.count();
    
    res.status(200).json({
        success: true,
        numberOfCategories
    });
}

exports.index = async (req, res, next) => {
    let categories = await categoryAdminService.getAllCategories();

    res.status(200).json({
        success: true,
        categories
    });
}

exports.store = async (req, res, next) => {
    let { name } = req.body;
    let slug = slugify(name);

    let newCategory = await categoryAdminService.createCategory({ name, slug });

    res.status(201).json({
        success: true,
        message: "category is created successfully",
        newCategory
    });
}
exports.update = async (req, res, next) => {
    let { id } = req.params;
    let { name } = req.body;
    let slug = slugify(name);

    let updateCategory = await categoryAdminService.updateCategory({ id }, {name, slug});

    if (updateCategory === false) 
        return res.status(404).json({
            success: false,
            message: `can't update this category`
        })
    
    res.status(200).json({
        success: true,
        message: "category is updated successfully"
    })
}

exports.show = async (req, res, next) => {
    let { id } = req.params;
    
    let category = await categoryAdminService.getCategory({ id });

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

