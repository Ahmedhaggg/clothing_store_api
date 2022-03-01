let categoryAdminService = require("../../services/admin/category.admin._service");
let slugify = require("slugify");

exports.store = async (req, res, next) => {
    let { name } = req.body;
    let slug = slugify(name);

    await categoryAdminService.createCategory({name, slug});
    res.status(201).json({
        success: true,
        message: "category is created successfully"
    });
}
