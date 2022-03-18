const { Op } = require("sequelize");
let { Product, Category, Subcategory, ProductDiscount, ProductColor, Inventory } = require("../../models/index"); 

exports.getCategories = async () => {
    let categories = await Category.findAll({
        attributes: ["id", "name", "slug"],
        include: [
            {
                model: Subcategory
            }
        ]
    });
    
    return categories;
}

exports.getCategoryProducts = async query => {
    let category = await Category.findOne({
        where: query,
        include: [
            {
                model: Product,
                attributes: ["id", "name", "slug", "price", "image"],
                where: {
                    active: true
                },
                required: false,
                include: [
                    {
                        model: ProductDiscount,
                        attributes: ["percent"],
                        where: {
                            expiresin: {
                                [Op.gt]: new Date()
                            }
                        },
                        required: false
                    },
                    {
                        model: Inventory,
                        attributes: [],
                        where: {
                            quantity: {
                                [Op.gte]: 1
                            }
                        },
                        required: true
                    }
                ]
            }
        ]
    })

    return category;
}
