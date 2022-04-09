let productService = require("../../../services/admin/product.admin._service");
let categoryService = require("../../../services/admin/category.admin._service");
let subcategoryService = require("../../../services/admin/subcategory.admin_service");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize"); 
let { productData, productDetails, productDiscountData , categoryData, subcategoryData, inventoryData, newProductData } = require("../../test.data")
describe("test all method in product service", () => {
     
 
    beforeAll( async () => {
        let newCategory = await categoryService.createCategory(categoryData);
        productData.categoryId = newCategory.id;
        subcategoryData.categoryId = newCategory.id;
        let newSubcategory = await subcategoryService.createSubcategory(subcategoryData);
        productData.subcategoryId = newSubcategory.id;
    });
    
    afterAll(async () => {
        await db.query("DELETE FROM products", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE});
    });
    
    it('createProduct should return object', async () => {
        let newProduct = await productService.createProduct(productData, productDiscountData, productDetails);
        console.log(JSON.stringify(newProduct, 0, 4));
        productData.id = newProduct.product.id;
        expect(newProduct).toHaveProperty("product");
        expect(newProduct).toHaveProperty("colors");
        expect(newProduct).toHaveProperty("inventory");
        expect(newProduct).toHaveProperty("discount");
    });

    it('updateProduct should return true', async () => {
        let updateProduct = await productService.updateProduct({ id: productData.id }, newProductData);
        expect(updateProduct).toBe(true);
    });

    it('getAllActiveProducts products should return array contains 2 product we add it', async () => {
        let products = await productService.getAllActiveProducts();
        expect(products.length).toBeGreaterThan(0);
    });

    it('get some product data should return object has data i identifier it', async () => {
        let someProductData = await productService.getSomeProductData({id: productData.id }, ["image"]);
        expect(someProductData).toHaveProperty("image");
    });
    
    it('checkActivityOfProduct should return true or false', async () => {
        let productActivity = await productService.checkActivityOfProduct({ id: productData.id });
        expect(productActivity).toBe(true)
    });
}); 