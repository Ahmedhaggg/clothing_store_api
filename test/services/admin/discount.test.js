let productService = require("../../../services/admin/product.admin._service");
let categoryService = require("../../../services/admin/category.admin._service");
let subcategoryService = require("../../../services/admin/subcategory.admin_service");
let discountService = require("../../../services/admin/productDiscount.admin._service");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");
let {categoryData, subcategoryData, productData, productDiscountData, newProductDiscountData, productDetails } = require("../../test.data")


describe("test all method in product service", () => {
    
    beforeAll( async () => {
        let newCategory = await categoryService.createCategory(categoryData);
        productData.categoryId = newCategory.id;
        subcategoryData.categoryId = newCategory.id;
        let newSubcategory = await subcategoryService.createSubcategory(subcategoryData);
        productData.subcategoryId = newSubcategory.id;
        let newProduct = await productService.createProduct(productData, productDiscountData, productDetails);
        productData.id = newProduct.product.id;
    });
    
    afterAll(async () => {
        await db.query("DELETE FROM products", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE});
    });

    it('updateDiscount should return true', async () => {
        let updateDiscount = await discountService.updateDiscount({ productId: productData.id }, newProductDiscountData);
        expect(updateDiscount).toBe(true);
    });

    it('deleteDiscount should return true', async () => {
        let deleteDiscount = await discountService.deleteDiscount({ productId: productData.id });
        expect(deleteDiscount).toBe(true);
    });

    it('createDiscount should return object', async () => {
        let newDiscount = await discountService.createDiscount(productDiscountData);
        console.log(newDiscount);
        expect(newDiscount).toHaveProperty("id");
        expect(newDiscount).toHaveProperty("percent");
        expect(newDiscount).toHaveProperty("expiresin");
        expect(newDiscount).toHaveProperty("description");
        expect(newDiscount).toHaveProperty("productId");
    });

});