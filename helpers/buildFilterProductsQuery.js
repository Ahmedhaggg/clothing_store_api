const { Op } = require("sequelize");
let { Product, ProductDiscount, Category, Subcategory, Inventory } = require("../models/index")

let buildSortInQuery = (sortBy) => {
    let sortData = sortBy.split(":");
    if (sortData[0] === "discount") 
       return ["products_discounts", "percent", sortData[1]]
    if (sortData[0] === "createdAt")
        return ["createdAt", sortData[1]]
    
}

class BuildFilterQuery {
    query = {
        where: {},
        attributes: ["id", "name", "slug", "price"],
        include: [
            {
                required: false,
                model: ProductDiscount,
                attributes: ["percent"],
                where: {
                    expiresin: {
                        [Op.lt]: new Date()
                    }
                }
            },
            {
                required: true,
                model: Inventory,
                where: {
                    quantity: {
                        [Op.gte]: 1
                    }
                }
            }
        ],
        order: []

    }
    
    setLimit(limit) {
        this.query.limit = limit;
    }
    setOffset(offset) {
        this.query.offset = offset;
    }
    setName(name) {
        this.query.where.name =  {
            [Op.like]: `%${name}`
        }
    } 
    setCategory(categoryName) {
        this.query.include.push({ 
            required: true,
            attributes: ["id", "name", "slug"],
            model: Category,
            where: {
                name: categoryName
            }
        });
    }
    setSubcategory(subcategory) {
        this.query.include.push({
            required: true, 
            attributes: ["id", "name", "slug"],
            model: Subcategory,
            where: {
                name: subcategory
            }
        });
    }
    setSortBy(sortQuery) {
        this.query.order.push(buildSortInQuery(sortQuery));
    }
    build() {
        return this.query;
    }
}

module.exports = BuildFilterQuery;

// let buildFilterQuery = filterRequirements => {
//     let query = {}
//     query.limit = filterRequirements.limit || 12;
//     query.offset = filterRequirements.offset || 0;
//     if (filterRequirements.name) 
//         query.where.name = {
//             [Op.like]: `%${filterRequirements.name}%`
//         };

//     // if (filterRequirements.sortBy)
        
//     let product = Product.findAll({
//         where: {
//             name: {
                
//             },
//         },
//         include: {
//             model 
//         }
//         offset: 10,
//         limit: 12,
//         order: [
//             ["productDiscounts", ]
//         ]
//     })
// }