let subcategoryService = require("../../services/users/subcategory.user._service");

exports.show = async (req, res, next) => {
    let { slug } = req.params;

    let subcategory = await subcategoryService.getSubCategory({ slug });

    if (!subcategory)
        return res.status(404).json({
            success: false,
            message: "subcategory isn't found"
        });
    
    res.status(200).json({
        success: true,
        subcategory
    });
}