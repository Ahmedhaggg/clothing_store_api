const { Op } = require("sequelize");
let { Category, Subcategory } = require("../../models/index"); 

exports.getAllCategories = async () => await Category
    .findAll({
        attributes: ["id", "name", "slug"],
        include: [
            {
                model: Subcategory,
                attributes: ["id", "name", "slug"]
            }
        ]
    });



exports.getSubcategoriesOfcategory = async query => await Category
    .findOne({
        where: query,
        attributes: ["id", "name", "slug"],
        include: {
            model: Subcategory,
            attributes: ["id", "name", "slug"]
        }
    });


// exports.getCategoryProducts = async query =>  await Category
    // .findOne({
    //     where: query,
    //     include: [
    //         {
    //             model: Product,
    //             attributes: ["id", "name", "slug", "price", "image"],
    //             where: {
    //                 active: true
    //             },
    //             required: false,
    //             include: [
    //                 {
    //                     model: ProductDiscount,
    //                     attributes: ["percent"],
    //                     where: {
    //                         expiresin: {
    //                             [Op.gt]: new Date()
    //                         }
    //                     },
    //                     required: false
    //                 },
    //                 {
    //                     model: Inventory,
    //                     attributes: [],
    //                     where: {
    //                         quantity: {
    //                             [Op.gte]: 1
    //                         }
    //                     },
    //                     required: true
    //                 }
    //             ]
    //         }
    //     ]
    // });
