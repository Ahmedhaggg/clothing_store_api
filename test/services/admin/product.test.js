let productService = require("../../../services/admin/product.admin._service");
let categoryService = require("../../../services/admin/category.admin._service");
let subcategoryService = require("../../../services/admin/subcategory.admin_service");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize"); 
let { productData, productDetails, productDiscountData , categoryData, subcategoryData, inventoryData } = require("../../test.data")
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
    
    it('createProduct should return object', async () => {
        let newProduct = await productService.createProduct({
            name: "black sweet shirt",
            slug: "black-sweet-shirt",
            description: "new style sweet shirt",
            price: 4.2,
            image: "newProduct.jpeg",
            categoryId: productData.categoryId,
            subcategoryId: productData.subcategoryId,
        }, productDiscountData, productDetails);
        expect(newProduct).toHaveProperty("product");
        expect(newProduct).toHaveProperty("colors");
        expect(newProduct).toHaveProperty("inventory");
        expect(newProduct).toHaveProperty("discount");
    });

    it('updateProduct should return true', async () => {
        let updateProduct = await productService.updateProduct(productData.id, {
            name: "new sweet shirt",
            slug: "new-sweet-shirt"
        });
        expect(updateProduct).toBe(true);
    });

    it('getAllActiveProducts products should return array contains 2 product we add it', async () => {
        let products = await productService.getAllActiveProducts();
        expect(products.length).toBe(2);
    });

    it('get some product data should return object has data i identifier it', async () => {
        let someProductData = await productService.getSomeProductData(productData.id, ["image"]);
        expect(someProductData.image).toBe(productData.image)
    });
    
    it('checkActivityOfProduct should return true or false', async () => {
        let productActivity = await productService.checkActivityOfProduct(productData.id);
        expect(productActivity).toBe(true)
    });
}); 