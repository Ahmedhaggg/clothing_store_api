const { Op } = require("sequelize");
let { Product, Category, Subcategory, ProductDiscount, ProductColor, Inventory } = require("../../models/index"); 

exports.getIndexProducts = async () => {
    let products = await Product.findAll({
        where: { active: true },
        attributes: ["name", "slug", "price"],
        include: [
            {
                model: Category,
                attributes: ["name", "slug"]
            },
            {
                model: Subcategory,
                attributes: ["name", "slug"]
            },
            {
                required: false,
                model: ProductDiscount,
                where: {
                    expiresin: {
                        [Op.gt]: new Date()
                    }
                }
            },
            {
                model: Inventory,
                required: true,
                attributes: [],
                where: {
                    quantity: {
                        [Op.gt]: 1
                    }
                },
                as: "available"
            }
        ],
        limit: 36
    });

    return products;
}

exports.getSomeProducts = async (query) => {
    let products = await Product.findAll(query);

    return products;
}

exports.getProduct = async (query) => {
    let product = await Product.findOne({
        where: query,
        attributes: ["name", "slug", "price", "description"],
        include: [
            {
                model: Category,
                attributes: ["name", "slug"]
            },
            {
                model: Subcategory,
                attributes: ["name", "slug"]
            },
            {
                model: ProductDiscount,
                required: false,
                attributes: ["percent", "expiresin", "description"],
                where: {
                    expiresin: {
                        [Op.gt]: new Date()
                    }
                }
            },
            {
                model: ProductColor,
                attributes: ["name"]
            },
            {
                model: Inventory,
                required: true,
                attributes: [],
                where: {
                    quantity: {
                        [Op.gt]: 1
                    }
                },
                as: "available"
            }
        ]
    });

    return product;
}