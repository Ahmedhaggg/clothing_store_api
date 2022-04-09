const { Sequelize } = require("sequelize");
let { Category, Subcategory, Product } = require("../../models/index");
let db = require("../../config/database")
exports.getAllCategories = async () => await Category.findAll();


exports.getCategory = async query => await Category
    .findOne({
        where: query,
        include: [
            {
                model: Subcategory,
                attributes: ["id", "name", "slug", "createdAt", "updatedAt"]
            },
            {
                model: Product,
                attributes: ["id", "name", "slug", "price", "image", "active", "description", "createdAt","updatedAt"]
            }
        ]
    });

    

exports.createCategory = async categoryData => await Category.create(categoryData);


exports.updateCategory = async (query, newData) => {
    let updatedCategory = await Category.update(newData, {
        where: query
    });

    return updatedCategory[0] === 1 ? true : false;
}

