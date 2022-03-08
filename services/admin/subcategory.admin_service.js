const { Sequelize, Op } = require("sequelize");
let { Subcategory, Product, ProductDiscount } = require("../../models/index");

exports.createSubcategory = async subcategoryData => {
    let newSubcategory = await Subcategory.create(subcategoryData);
    return newSubcategory;
}

exports.updateSubcategory = async (id, newData) => {
    let updatedSubcategory = await Subcategory.update(newData, {
        where: {id}
    });
    
    return updatedSubcategory[0] === 1 ? true : false;
}

exports.getSubcategory = async id => {
    let subcategory = await Subcategory.findOne({
        where: {id},
        attributes: ["name", "slug"],
        include: {
            required: false,
            model: Product,
            attributes: ["name", "price", "image"],
            include: {
                required: false,
                model: ProductDiscount,
                where: {
                    expiresin: { [Op.lt] : new Date() }
                },
                attributes: ["percent"]
            }
        }
    });

    return subcategory;
}