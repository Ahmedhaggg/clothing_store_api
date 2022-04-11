let adminCategoryService = require("../../../services/admin/category.admin._service");
let userSubcategoryService = require("../../../services/users/subcategory.user._service");
let adminSubcategoryService = require("../../../services/admin/subcategory.admin_service");
let userCategoryService = require("../../../services/users/category.user._service");
let adminProductService = require("../../../services/admin/product.admin._service")
let { categoryData, subcategoryData, productData, productDiscountData, productDetails } = require("../../test.data");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");

describe('test all method in user subcategory service', () => {
    
    beforeAll(async () => {
        let category = await adminCategoryService.createCategory(categoryData);
        subcategoryData.categoryId = category.id;
        productData.categoryId = category.id;
        let subcategory = await adminSubcategoryService.createSubcategory(subcategoryData);
        subcategoryData.id = subcategory.id;
        productData.subcategoryId = subcategory.id;
        let product = await adminProductService.createProduct(productData, productDiscountData, productDetails);
    });
    afterAll(async () => {
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM products", { type: QueryTypes.DELETE});
    });
    
    it('getSubcategory should return subcategory attributes and products', async () => {
        try {
            let subcategory = await userSubcategoryService.getSubCategory({ id: subcategoryData.id });
            console.log("subbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
            console.log(JSON.stringify(subcategory, 0, 4));
        } catch (error) {
            console.log("errrorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
            console.log(JSON.stringify(error, 0, 4));
        }
    });


});