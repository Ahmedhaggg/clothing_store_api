const { Op } = require("sequelize");
let { Subcategory, Category, Product, ProductDiscount } = require("../../models/index");

exports.getAllSubcategories = async () => await Subcategory
    .findAll({ 
        attributes: ["id", "name"],
        include: {
            model: Category,
            attributes: ["id", "name"]
        }
    });
exports.createSubcategory = async subcategoryData => await Subcategory.create(subcategoryData);

exports.updateSubcategory = async (query, newData) => {
    let updatedSubcategory = await Subcategory.update(newData, {
        where: query
    });
    
    return updatedSubcategory[0] === 1 ? true : false;
}

exports.getSubcategory = async query =>  await Subcategory
    .findOne({
        where: query,
        attributes: ["name", "slug", "createdAt", "updatedAt"],
        include: {
            required: false,
            model: Product,
            attributes: ["name", "price", "image"],
            include: {
                required: false,
                model: ProductDiscount,
                as: "discount", 
                where: {
                    expiresin: { [Op.lt] : new Date() }
                },
                attributes: ["percent"]
            }
        }
    });
