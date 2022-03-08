let productService = require("../../../services/admin/product.admin._service");
let categoryService = require("../../../services/admin/category.admin._service");
let subcategoryService = require("../../../services/admin/subcategory.admin_service");
let inventoryService = require("../../../services/admin/inventory.admin._service");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");

describe("test all method in product service", () => {
    let productData = {
        name: "sweet shirt",
        slug: "sweet-shirt",
        description: "new style sweet shirt",
        price: 4.2,
        image: "newProduct.jpeg"
    };
    let discountData = {
        percent: 10,
        description: "this is new description",
        expiresin: "2022-12-14"
    };
    let inventoryData = {
        quantity: 10
    }
    let colorsData = [
        {name: "red"},
        {name: "green"}
    ];
    let categoryData = {
        name: "sweet shirt",
        slug: "sweet-shirt"
    };
    let subcategoryData = {
        name: "sweet shirt",
        slug: "sweet-shirt"
    };

    beforeAll( async () => {
        let newCategory = await categoryService.createCategory(categoryData);
        productData.categoryId = newCategory.id;
        subcategoryData.categoryId = newCategory.id;
        let newSubcategory = await subcategoryService.createSubcategory(subcategoryData);
        productData.subcategoryId = newSubcategory.id;
        let newProduct = await productService.createProduct(productData, discountData, inventoryData, colorsData);
        productData.id = newProduct.product.id;
        inventoryData.id = newProduct.inventory.id;
    });
    
    afterAll(async () => {
        await db.query("DELETE FROM products", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE});
    });

    it('updateDiscount should return true', async () => {
        let updateIneventory = await inventoryService.updateIneventory(inventoryData.id, {
            quantity: 50
        });
        expect(updateIneventory).toBe(true);
    });

});