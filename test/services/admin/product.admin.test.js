let productService = require("../../../services/admin/product.admin._service");
let categoryService = require("../../../services/admin/category.admin._service");
let subcategoryService = require("../../../services/admin/subcategory.admin_service");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize"); 
let { productData, productDetails, productDiscountData , categoryData, subcategoryData, inventoryData, newProductData } = require("../../test.data")
describe("test all method in admin product service", () => {
     
 
    beforeAll( async () => {
        let newCategory = await categoryService.createCategory(categoryData);
        productData.categoryId = newCategory.id;
        subcategoryData.categoryId = newCategory.id;
        let newSubcategory = await subcategoryService.createSubcategory(subcategoryData);
        productData.subcategoryId = newSubcategory.id;
    });
    
    // afterAll(async () => {
    //     await db.query("DELETE FROM products", { type: QueryTypes.DELETE});
    //     await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
    //     await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE});
    // });
    
    it('createProduct should return object', async () => {
        let newProduct = await productService.createProduct(productData, productDiscountData, productDetails);
        productData.id = newProduct.id;
        expect(newProduct).toHaveProperty("id");
        expect(newProduct).toHaveProperty("name");
        expect(newProduct).toHaveProperty("slug");
        expect(newProduct).toHaveProperty("price");
        expect(newProduct).toHaveProperty("image");
        expect(newProduct).toHaveProperty("description");
        expect(newProduct).toHaveProperty("createdAt");
        expect(newProduct).toHaveProperty("updatedAt");
        expect(newProduct).toHaveProperty("categoryId");
        expect(newProduct).toHaveProperty("subcategoryId");
    });

    it('updateProduct should return true', async () => {
        let updateProduct = await productService.updateProduct({ id: productData.id }, newProductData);
        expect(updateProduct).toBe(true);
    });

    it('getAllActiveProducts products should return array contains 2 product we add it', async () => {
        let products = await productService.getProdutcts({ active: true });
        expect(products.length).toBeGreaterThan(0);
    });

    it('get some product data should return object has data i identifier it', async () => {
        let someProductData = await productService.getSomeProductData({id: productData.id }, ["image"]);
        expect(someProductData).toHaveProperty("image");
    });

    it('get product should return should object conatins attributes, category, subcategory, discount and colors inventory attributes', async () => {
        let product = await productService.getProduct({ id: productData.id });
        console.log(JSON.stringify(product, 0, 4));
        expect(product).toHaveProperty("id");
        expect(product).toHaveProperty("name");
        expect(product).toHaveProperty("slug");
        expect(product).toHaveProperty("price");
        expect(product).toHaveProperty("image");
        expect(product).toHaveProperty("description");
        expect(product).toHaveProperty("createdAt");
        expect(product).toHaveProperty("updatedAt");
        expect(product).toHaveProperty("category");
        expect(product).toHaveProperty("subcategory");
        expect(product).toHaveProperty("colors");
        expect(product).toHaveProperty("discount");
    });
}); 