const { Op } = require("sequelize");
let {  ProductDiscount, Category, Subcategory, ProductColor ,Inventory } = require("../models/index")

let buildSortInQuery = (sortBy) => {
    let sortData = sortBy.split(":");
    if (sortData[0] === "discount") 
       return [{ model: ProductDiscount, as: "discount"}, "percent", sortData[1]]
    if (sortData[0] === "createdAt")
        return ["createdAt", sortData[1]]
    
}

class BuildFilterProductsQuery {
    query;
    constructor() {
        this.query = {
            where: {},
            attributes: ["id", "name", "slug", "price", "image", "description"],
            include: [
                {
                    required: false,
                    model: ProductDiscount,
                    as: "discount",
                    attributes: ["percent", "expiresin"],
                    where: {
                        expiresin: {
                            [Op.gte]: new Date()
                        }
                    }
                },
                {
                    required: true,
                    model: ProductColor,
                    as: "colors",
                    attributes: ["name"],
                    include: {
                        required: true,
                        model: Inventory,
                        attributes: ["size"],
                        where: {
                            quantity: {
                                [Op.gte]: 1
                            }
                        }
                    }
                }
            ]
        }
    }
    setLimit(limit) {
        this.query.limit = limit;
    }
    setOffset(offset) {
        this.query.offset = offset;
    }
    setName(name) {
        this.query.where.name =  {
            [Op.like]: `%${name}%`
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
    setSortBy(sortBy) {
        console.log(buildSortInQuery(sortBy));
        let sort = [];
        sort.push(buildSortInQuery(sortBy));
        this.query.order = [sort];
    }
    build() {
        return this.query;
    }
}

module.exports = BuildFilterProductsQuery;