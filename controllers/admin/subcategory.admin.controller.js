let subcategoryAdminService = require("../../services/admin/subcategory.admin_service")
let slugify = require("slugify");

exports.store = async (req, res, next) => {
    let { name, categoryId } = req.body;
    let slug = slugify(name);

    await subcategoryAdminService.createSubcategory({name, slug, categoryId});
    res.status(201).json({
        success: true,
        message: "subcategory is created successfully"
    });
}
