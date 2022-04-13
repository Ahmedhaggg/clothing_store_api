const { Op } = require("sequelize");
let { Product, ProductColor, ProductDiscount, Inventory, Category, Subcategory } = require("../../models/index");
let db = require("../../config/database");

exports.getAllActiveProducts = async () =>  await Product
    .findAll({
        where: { active: true },
        attributes: ["id", "name", "slug", "price", "description", "createdAt", "updatedAt"],
        include: [
            {
                required: false,
                model: ProductDiscount,
                as: "discount",
                where: { expiresin : {[Op.gt]: new Date() }},
                attributes: ["percent"]
            },
            {
                model: Inventory,
                attributes: ["quantity", "size"]
            }
        ]
    });


exports.createProduct = async (product, discount, productDetails) => {
    let newTransaction = await db.transaction();
    
    try {
        
        let newProduct = await Product.create(product, {transaction: newTransaction});
        

        let newProductDiscount;
        if (discount) {
            discount.productId = newProduct.id;
            newProductDiscount = await ProductDiscount.create(discount, {transaction: newTransaction});
        }
        
        let colorsData = productDetails.map(productDetail => { return { name: productDetail.color, productId: newProduct.id} });
        let newProductColors = await ProductColor.bulkCreate(colorsData, {transaction: newTransaction});

        let inventoryData = [];
        productDetails.forEach(productDetail => {
            let colorId = (newProductColors.find(color => color.name === productDetail.color)).id
            productDetail.sizes.forEach(size => { 
                size.colorId = colorId;
                size.productId = newProduct.id;
                inventoryData.push(size)
            })
        })
        
        let newProductInventory = await Inventory.bulkCreate(inventoryData, {transaction: newTransaction});
        await newTransaction.commit();
        
        return {
            product: newProduct,
            inventory: newProductInventory,
            discount : newProductDiscount || null,
            colors: newProductColors
        };
    } catch (error) {
        await newTransaction.rollback();
        
        return null;
    }

}



exports.updateProduct = async (query, newDate) => {
    let updatedProduct = await Product.update(newDate, {
        where: query
    });
    return updatedProduct[0] === 1 ? true : false;
            
}

exports.getSomeProductData = async (query, fields) => await Product
    .findOne({
        where: query,
        attributes: fields
    });

exports.checkActivityOfProduct = async query => {
    let product = await Product.findOne({
        where: query,
        attributes: ["active"]
    });
    return product.active;
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