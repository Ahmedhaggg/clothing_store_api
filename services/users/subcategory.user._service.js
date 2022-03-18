const { Op } = require("sequelize");
let { Product, Category, Subcategory, ProductDiscount, ProductColor, Inventory } = require("../../models/index"); 

exports.getSubCategory = async query => {
    let subcategory = await Subcategory.findOne({
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

    return subcategory;
}