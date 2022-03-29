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

exports.createProduct = async (product, discount, productDetails) => {
    console.log(productDetails)
    let newTransaction = await db.transaction();
    
    try {
        
        let newProduct = await Product.create(product, {transaction: newTransaction});
        

        let newProductDiscount;
        if (discount) {
            discount.productId = newProduct.id;
            newProductDiscount = await ProductDiscount.create(discount, {transaction: newTransaction});
        }
        
        let colorsData = productDetails.map(color => { return { name: color.name, productId: newProduct.id} });

        let newProductColors = await ProductColor.bulkCreate(colorsData, {transaction: newTransaction});

        let inventories = productDetails.map(productDetail => {
            let colorId = (newProductColors.find(color => color.name === productDetail.name)).id
            return {
                colorId,
                productId: newProduct.id,
                quantity: productDetail.quantity
            }
        })
        
        let newProductInventory = await Inventory.bulkCreate(inventories, {transaction: newTransaction});
        await newTransaction.commit();
        
        return {
            product: newProduct,
            inventory: newProductInventory,
            discount : newProductDiscount || null,
            colors: newProductColors
        };
    } catch (error) {
        console.log("error")
        console.log(error);
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