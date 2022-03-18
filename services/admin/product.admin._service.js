const { Op } = require("sequelize");
let { Product, ProductColor, ProductDiscount, Inventory, Category, Subcategory } = require("../../models/index");
let db = require("../../config/database");
let { ForeignKeyConstraintError } = require("sequelize")

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
                attributes: ["quantity", "size"]
            }
        ]
    });

    return products;
}

exports.createProduct = async (product, discount, inventories, colors) => {
    let newTransaction = await db.transaction();
    
    try {
        
        let newProduct = await Product.create(product, {transaction: newTransaction});
        
        inventories.forEach( item => {
            item.productId = newProduct.id;
        });
        let newProductInventory = await Inventory.bulkCreate(inventories, {transaction: newTransaction});

        let newProductDiscount;
        if (discount) {
            discount.productId = newProduct.id;
            newProductDiscount = await ProductDiscount.create(discount, {transaction: newTransaction});
        }
        
        colors.forEach(color => {
            color.productId = newProduct.id;
        });

        let newProductColors = await ProductColor.bulkCreate(colors, {transaction: newTransaction});
        
        await newTransaction.commit();
        
        return {
            product: newProduct,
            inventories: newProductInventory,
            discount : newProductDiscount || null,
            colors: newProductColors
        };
    } catch (error) {
        await newTransaction.rollback();
        
        return null;
    }

}

exports.updateProduct = async (id, newDate) => {
    let updatedProduct = await Product.update(newDate, {
        where: { id }
    });

    return updatedProduct[0] === 1 ? true : false;
            
}

exports.getSomeProductData = async (id, fields) => {
    let product = await Product.findOne({
        where: {id},
        attributes: fields
    });
    return product;
}

exports.checkActivityOfProduct = async (id) => {
    let product = await Product.findOne({
        where: {id},
        attributes: ["active"]
    });
    return product.getDataValue("active");
}
// let product = await Product.findOne({
        //     where: { id },
        //     attributes: ["name", "slug", "price", "description", "image"],
        //     include: [
        //         {
        //             model: Category
        //         },
        //         {
        //             model: Subcategory
        //         }
        //     ]
        // })