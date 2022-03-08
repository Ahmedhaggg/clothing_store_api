let productService = require("../../../services/admin/product.admin._service");
let categoryService = require("../../../services/admin/category.admin._service");
let subcategoryService = require("../../../services/admin/subcategory.admin_service");
let discountService = require("../../../services/admin/productDiscount.admin._service");
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
        console.log(newProduct.product.id)
        productData.id = newProduct.product.id;
        discountData.id = newProduct.discount.id;
    });
    
    afterAll(async () => {
        await db.query("DELETE FROM products", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE});
    });

    it('updateDiscount should return true', async () => {
        let updateDiscount = await discountService.updateDiscount(discountData.id, {
            percent: 50
        });
        expect(updateDiscount).toBe(true);
    });

    it('deleteDiscount should return true', async () => {
        let deleteDiscount = await discountService.deleteDiscount(discountData.id);
        expect(deleteDiscount).toBe(true);
    });

    it('createDiscount should return object', async () => {
        let newDiscount = await discountService.createDiscount({
            percent: discountData.percent,
            description: discountData.description,
            expiresin: discountData.expiresin,
            productId: productData.id
        });
        expect(newDiscount).toHaveProperty("id");
        expect(newDiscount).toHaveProperty("percent");
        expect(newDiscount).toHaveProperty("expiresin");
        expect(newDiscount).toHaveProperty("description");
        expect(newDiscount).toHaveProperty("productId");
    });

});