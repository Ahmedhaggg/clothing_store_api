const { Op } = require("sequelize");
let { Product, ProductColor, ProductDiscount, Inventory } = require("../../models/index");
let db = require("../../config/database");

exports.getAllActiveProducts = async () => {
    let products = await Product.findAll({
        where: { active: true },
        attributes: ["id", "name", "slug", "price", "description"],
        include: [
            {
                required: false,
                model: ProductDiscount,
                where: { expiresin : {[Op.gt]: new Date() }},
                attributes: ["percent"]
            },
            {
                model: Inventory,
                attributes: ["quantity"]
            }
        ]
    });

    return products;
}

exports.createProduct = async (product, discount, inventory, colors) => {
    let newTransaction = await db.transaction();
    
    try {
        
        let newProduct = await Product.create(product, {transaction: newTransaction});
        
        inventory.productId = newProduct.id;
        await Inventory.create(inventory, {transaction: newTransaction});

        discount.productId = newProduct.id;
        await ProductDiscount.create(discount, {transaction: newTransaction});

        colors.forEach(color => {
            color.productId = newProduct.id;
        });

        await ProductColor.bulkCreate(colors, {transaction: newTransaction});
        
        await newTransaction.commit();
        
        return true;
    } catch (error) {
        await newTransaction.rollback();
        
        return false;
    }

}

