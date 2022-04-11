const { Op, where } = require("sequelize");
let { Product, Category, Subcategory, ProductDiscount, ProductColor, Inventory } = require("../../models/index"); 

// exports.getSubCategory = async query => await Subcategory
//     .findOne({
//         where: query,
//         attributes: ["name", "slug"],
//         include: [
//             {
//                 model: Product,
//                 attributes: ["name", "slug", "price", "image"],
//                 where: {
//                     active: true
//                 },
//                 required: false,
//                 include: [
//                     {
//                         model: ProductDiscount,
//                         attributes: ["percent"],
//                         where: {
//                             expiresin: {
//                                 [Op.gt]: new Date()
//                             }
//                         },
//                         required: false
//                     },
//                     {
//                         model: ProductColor,
//                         as: "productColors",
//                         attributes: ["name"],
//                         required: false,
//                         include: {
//                             model: Inventory,                            
//                             attributes: ["size"],
//                             where: {
//                                 quantity: {
//                                     [Op.gte]: 1
//                                 }
//                             },
//                             required: true
//                         }
//                     }
//                 ]
//             }
//         ]
//     });

exports.getSubCategory = async query => await Subcategory
    .findOne({
        where: query,
        attributes: ["name", "slug"],
        include: [
            {
                model: Product,
                where: {
                    active: true
                },
                required: false,
                include: [
                    {
                        model: ProductDiscount,
                        where: {
                            expiresin: {
                                [Op.gt]: new Date()
                            }
                        },
                        required: false
                    },
                    {
                        model: ProductColor,
                        as: "productColors",
                        required: true,
                        include: [
                            {
                                model: Inventory,
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