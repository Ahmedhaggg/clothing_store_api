const { Op, where } = require("sequelize");
let { Product, Subcategory, ProductDiscount, ProductColor, Inventory } = require("../../models/index"); 

exports.getSubCategory = async query => await Subcategory
    .findOne({
        where: query,
        attributes: ["id", "name", "slug"],
        include: [
            {
                model: Product,
                attributes: ["id", "name", "slug", "price", "image"],
                where: {
                    active: true,
                },
                required: false,
                include: [
                    {
                        model: ProductDiscount,
                        as: "discount",
                        attributes: ["percent", "expiresin"],
                        where: {
                            expiresin: {
                                [Op.gt]: new Date()
                            }
                        },
                        required: false
                    },
                    {
                        model: ProductColor,
                        attributes: ["name"],
                        as: "productColors",
                        required: true,
                        include: [
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
            }
        ]
    })