const { Op } = require("sequelize");
let { Product, ProductColor, ProductDiscount, Inventory, Category, Subcategory } = require("../../models/index");
let db = require("../../config/database");

exports.getProduct = async query => await Product.findOne({
        where: query,
        attributes: ["id", "name", "slug", "image", "price", "description", "active", "createdAt", "updatedAt"],
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
                model: ProductDiscount,
                as: "discount",
                where: { expiresin : {[Op.gt]: new Date() }},
                attributes: ["id", "expiresin", "percent", "description", "createdAt", "updatedAt"]
            },
            {
                model: ProductColor,
                as: "colors",
                attributes: ["id", "name"],
                include: {
                    model: Inventory,
                    attributes: ["id", "size", "quantity"]
                }
            }
        ]
    });


exports.getProdutcts = async query =>  await Product
    .findAll({
        where: query,
        attributes: ["id", "name", "slug", "price", "description", "createdAt", "updatedAt"],
        include: [
            {
                required: false,
                model: ProductDiscount,
                as: "discount",
                where: { expiresin : {[Op.gt]: new Date() }},
                attributes: ["percent", "expiresin"]
            },
            {
                required: query.active == true ? true : false,
                model: Inventory,
                attributes: [],
                where: {
                    quantity: {
                        [Op.gte]: 1
                    }
                }
            },
            {
                model: Category,
                attributes: ["id", "name"]
            },
            {
                model: Subcategory,
                attributes: ["id", "name"]
            },
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
        
        await Inventory.bulkCreate(inventoryData, {transaction: newTransaction});
        await newTransaction.commit();
        
        return newProduct;
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
