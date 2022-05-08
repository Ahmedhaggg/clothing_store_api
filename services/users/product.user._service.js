const { Op } = require("sequelize");
let { Product, Category, Subcategory, ProductDiscount, ProductColor, Inventory } = require("../../models/index"); 

exports.getIndexProducts = async () => await Product
    .findAll({
        where: { active: true },
        attributes: ["id", "name", "slug", "price", "image", "description"],
        include: [
            {
                model: Category,
                attributes: ["id", "name", "slug"]
            },
            {
                model: Subcategory,
                attributes: ["id", "name", "slug"]
            },
            {
                required: false,
                attributes: ["percent", "expiresin"],
                model: ProductDiscount,
                as: "discount",
                where: {
                    expiresin: {
                        [Op.gt]: new Date()
                    }
                }
            },
            {
                model: ProductColor,
                as: "colors",
                required: true,
                attributes: ["name"],
                include: {
                    model: Inventory,
                    attributes: [],
                    where: {
                        quantity: {
                            [Op.gte]: 1
                        }
                    }
                }
            }
        ],
        limit: 36
    });

exports.getProductsByQuery = async query => await Product.findAll(query);

exports.getProduct = async (query) => await Product
    .findOne({
        where: query,
        attributes: ["id", "name", "slug", "price", "image", "description"],
        include: [
            {
                model: Category,
                attributes: ["id", "name", "slug"]
            },
            {
                model: Subcategory,
                attributes: ["id", "name", "slug"]
            },
            {
                model: ProductDiscount,
                as: "discount",
                required: false,
                attributes: ["percent", "expiresin", "description"],
                where: {
                    expiresin: {
                        [Op.gt]: new Date()
                    }
                }
            },
            {
                required: true,
                model: ProductColor,
                as: "colors",
                attributes: ["name"],
                include: {
                    model: Inventory,
                    required: true,
                    attributes: ["size"],
                    where: {
                        quantity: {
                            [Op.gt]: 1
                        }
                    },
                }
            },
            
        ]
    });
