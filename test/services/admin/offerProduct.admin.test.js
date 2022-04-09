let offerService = require("../../../services/admin/offer.admin._service");
let productService = require("../../../services/admin/product.admin._service");
let categoryService = require("../../../services/admin/category.admin._service");
let subcategoryService = require("../../../services/admin/subcategory.admin_service");
let offerProductService = require("../../../services/admin/offerProduct.admin._service");
let db = require("../../../config/database");
const { QueryTypes, where } = require("sequelize");
let {categoryData, subcategoryData, productData, productDiscountData, productDetails, offerData, offerProductsData, secondProductData, offerProductData, newOfferProductData } = require("../../test.data")
describe('test all method in offer service', () => {

    beforeAll( async () => {
        let newCategory = await categoryService.createCategory(categoryData);
        productData.categoryId = newCategory.id;
        subcategoryData.categoryId = newCategory.id;
        let newSubcategory = await subcategoryService.createSubcategory(subcategoryData);
        productData.subcategoryId = newSubcategory.id;
        let newProduct = await productService.createProduct(productData, productDiscountData, productDetails);
        offerProductsData[0].productId = newProduct.product.id;
        let secondProduct = await productService.createProduct(secondProductData, productDiscountData, productDetails);
        offerProductData.productId = secondProduct.product.id;
        offerProductsData[1].productId = secondProduct.product.id;
        let newOffer = await offerService.createOffer(offerData, offerProductsData);
        offerData.id = newOffer.offer.id;
        offerProductData.offerId = newOffer.offer.id;
    });

    afterAll(async () => {
        await db.query("DELETE FROM products", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM offers", { type: QueryTypes.DELETE});
    });

    it('addProductToOffer should return object has new offer product data', async () => {
        let newOfferProduct = await offerProductService.addProductToOffer(offerProductData);
        offerProductData.id = newOfferProduct.id;
        expect(newOfferProduct).toHaveProperty("productId");
        expect(newOfferProduct).toHaveProperty("offerId", offerData.id);
        expect(newOfferProduct).toHaveProperty("quantity");
    });
    
    it('getSomeOfferProductData should return object contains some attributes', async () => {
        let offerProduct = await offerProductService.getSomeOfferProductData({ id: offerProductData.id }, ["id"]);
        expect(offerProduct).toHaveProperty("id");
    });
    it('updateOfferProduct should be true', async () => {
        let updateOfferProduct = await offerProductService.updateOfferProduct({ id: offerProductData.id }, newOfferProductData);
        expect(updateOfferProduct).toBe(true);
    });

    it('deleteOfferProduct should be true', async () => {
        let updateOfferProduct = await offerProductService.deleteOfferProduct({ id: offerProductData.id });
        expect(updateOfferProduct).toBe(true);
    });
})