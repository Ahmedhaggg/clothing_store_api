let productService = require("../../../services/admin/product.admin._service");
let categoryService = require("../../../services/admin/category.admin._service");
let subcategoryService = require("../../../services/admin/subcategory.admin_service");
let productColorService = require("../../../services/admin/productColors.admin._services")
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize"); 
let { productData, productDetails, productDiscountData , categoryData, subcategoryData, productColorData } = require("../../test.data")
describe("test all method in product service", () => {
     
 
    beforeAll( async () => {
        let newCategory = await categoryService.createCategory(categoryData);
        productData.categoryId = newCategory.id;
        subcategoryData.categoryId = newCategory.id;
        let newSubcategory = await subcategoryService.createSubcategory(subcategoryData);
        productData.subcategoryId = newSubcategory.id;
        let newProduct = await productService.createProduct(productData, productDiscountData, productDetails);
        productColorData.productId = newProduct.product.id;
    });
    
    afterAll(async () => {
        await db.query("DELETE FROM products", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE});
    });
    
    it('addColorToProduct should return object', async () => {
        let newColor = await productColorService.addColorToProduct(productColorData);
        productColorData.id = newColor.id;
        expect(newColor).toHaveProperty("id");
        expect(newColor).toHaveProperty("name");
        expect(newColor).toHaveProperty("productId");
    });
    it('deleteColorFromProduct should return true', async () => {
        let deleteColor = await productColorService.deleteColorfromProduct({ id: productColorData.id });
        expect(deleteColor).toBe(true);
    });
})