let userProductService = require("../../../services/users/product.user._service");
let adminProductService = require("../../../services/admin/product.admin._service");
let categoryService = require("../../../services/admin/category.admin._service");
let BuildFilterQuery = require("../../../helpers/buildFilterProductsQuery");
let subcategoryService = require("../../../services/admin/subcategory.admin_service");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize"); 
let { productData, productDetails, productDiscountData , categoryData, subcategoryData, secondProductData} = require("../../test.data");

describe('test all method in product user service', () => {
    beforeAll( async () => {
        let newCategory = await categoryService.createCategory(categoryData);
        productData.categoryId = newCategory.id;
        secondProductData.categoryId = newCategory.id;
        subcategoryData.categoryId = newCategory.id;
        let newSubcategory = await subcategoryService.createSubcategory(subcategoryData);
        productData.subcategoryId = newSubcategory.id;
        secondProductData.subcategoryId = newSubcategory.id;
        await adminProductService.createProduct(productData, productDiscountData, productDetails);
        await adminProductService.createProduct(secondProductData, productDiscountData, productDetails);
    });
    
    afterAll(async () => {
        await db.query("DELETE FROM products", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE});
    });
    
    it('getIndexProducts should return array of object contains product attributes and category  and subcategory attributes ', async () => {
        let products = await userProductService.getIndexProducts();
        expect(products.length).toBe(2);
        expect(products[0]).toHaveProperty("id");
        expect(products[0]).toHaveProperty("name");
        expect(products[0]).toHaveProperty("slug");
        expect(products[0]).toHaveProperty("price");
        expect(products[0]).toHaveProperty("image");
        expect(products[0]).toHaveProperty("description");
        expect(products[0]).toHaveProperty("category");
        expect(products[0]).toHaveProperty("subcategory");
        expect(products[0]).toHaveProperty("discount");
        expect(products[0]).toHaveProperty("productColors");
    });
    it('getProduct should return object contains product data ', async () => {
        let product = await userProductService.getProduct({ slug: productData.slug });
        expect(product).toHaveProperty("id");
        expect(product).toHaveProperty("name");
        expect(product).toHaveProperty("slug");
        expect(product).toHaveProperty("price");
        expect(product).toHaveProperty("image");
        expect(product).toHaveProperty("description");
        expect(product).toHaveProperty("category");
        expect(product).toHaveProperty("subcategory");
        expect(product).toHaveProperty("discount");
        expect(product).toHaveProperty("productColors");
    });

    it('getProductsByQuery should return array', async () => {
        let query = new BuildFilterQuery();
        query.setCategory(categoryData.name);
        query.setSubcategory(subcategoryData.name);
        query.setName(productData.name);
        query.setLimit(1);
        let products = await userProductService.getProductsByQuery(query.build());
        expect(products.length).toBe(1);
        expect(products[0]).toHaveProperty("name", productData.name);
    });
});