const { Sequelize } = require("sequelize");
let { Category, Subcategory } = require("../../models/index");
let db = require("../../config/database")
exports.getAllCategories = async () => {
    let categories = await Category.findAll({
        include: {
            required: false, 
            model: Subcategory 
        }
    });

    return categories;
}

exports.getCategory = async id => {
    let category = await Category.findOne({
        attributes: [
            "name",
            "slug"
        ],
        where: {id},
        include: {
            required: false,
            model: Subcategory,
            attributes: [
                "id",
                "name"
            ]
        }
    });

    return category;
}

exports.createCategory = async categoryData => {
    let newCategory = await Category.create(categoryData);
    return newCategory;
}

exports.updateCategory = async (id, newData) => {
    let updatedCategory = await Category.update(newData, {
        where: {id}
    });

    return updatedCategory[0] === 1 ? true : false;
}

exports.getSubcategoriesName = async (categoryId) => {
    let subcategoriesNames = await Category.findOne({
        where: {id: categoryId},
        attributes: [],
        include: [{
            model: Subcategory,
            attributes: ["name"]
        }]
    });

    return subcategoriesNames;
} 