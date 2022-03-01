let { Category } = require("../../models/index");

exports.createCategory = async category => {
    await Category.create(category);
}