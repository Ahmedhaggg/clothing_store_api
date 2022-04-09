let productService = require("../../../services/admin/product.admin._service");
let categoryService = require("../../../services/admin/category.admin._service");
let subcategoryService = require("../../../services/admin/subcategory.admin_service");
let inventoryService = require("../../../services/admin/inventory.admin._service");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");
let {categoryData, subcategoryData, productData, productDiscountData, productDetails } = require("../../test.data")

describe("test all method in product service", () => {
    let colorId;
    let inventoryId;
    beforeAll( async () => {
        let newCategory = await categoryService.createCategory(categoryData);
        productData.categoryId = newCategory.id;
        subcategoryData.categoryId = newCategory.id;
        let newSubcategory = await subcategoryService.createSubcategory(subcategoryData);
        productData.subcategoryId = newSubcategory.id;
        let newProduct = await productService.createProduct(productData, productDiscountData, productDetails);
        productData.id = newProduct.product.id;
        colorId = newProduct.colors[0].id;
        inventoryId = newProduct.inventory[0].id;
    });
    
    afterAll(async () => {
        await db.query("DELETE FROM products", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE});
    });

    it('updateDiscount should return true', async () => {
        let updateIneventory = await inventoryService.updateIneventory({ id: inventoryId }, {
            quantity: 50
        });
        expect(updateIneventory).toBe(true);
    });

});