let userProductService = require("../../../services/users/product.user._service");
let adminProductService = require("../../../services/admin/product.admin._service");
let categoryService = require("../../../services/admin/category.admin._service");
let subcategoryService = require("../../../services/admin/subcategory.admin_service");
let adminOfferService = require("../../../services/admin/offer.admin._service");
let userOfferService = require("../../../services/users/offer.user._service");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize"); 
let { productData, productDetails, productDiscountData , categoryData, subcategoryData, secondProductData, offerData, offerProductsData } = require("../../test.data");

describe('test all method in product user service', () => {
    beforeAll( async () => {
        // let newCategory = await categoryService.createCategory(categoryData);
        // productData.categoryId = newCategory.id;
        // secondProductData.categoryId = newCategory.id;
        // subcategoryData.categoryId = newCategory.id;
        // let newSubcategory = await subcategoryService.createSubcategory(subcategoryData);
        // productData.subcategoryId = newSubcategory.id;
        // secondProductData.subcategoryId = newSubcategory.id;
        let firstProduct = await adminProductService.createProduct(productData, productDiscountData, productDetails);
        offerProductsData[0].productId = firstProduct.product.id;
        let secondProduct = await adminProductService.createProduct(secondProductData, productDiscountData, productDetails);
        offerProductsData[1].productId = secondProduct.product.id;
        await adminOfferService.createOffer(offerData, offerProductsData);


    });
    
    afterAll(async () => {
        await db.query("DELETE FROM products", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM offers", { type: QueryTypes.DELETE});
    });

    it('getOffers should return array', async () => {
        let offers = await userOfferService.getOffers();
        expect(offers.length).toBe(1);
        expect(offers[0]).toHaveProperty("id");
        expect(offers[0]).toHaveProperty("name");
        expect(offers[0]).toHaveProperty("slug");
        expect(offers[0]).toHaveProperty("price");
        expect(offers[0]).toHaveProperty("image");
        expect(offers[0]).toHaveProperty("expiresin");
        expect(offers[0]).toHaveProperty("offerProducts");

        // console.log(JSON.stringify(offers, 0, 4));
        
    });

    it('getOffer should return object', async () => {
        let offer = await userOfferService.getOffer({ slug: offerData.slug });        
        expect(offer).toHaveProperty("id");
        expect(offer).toHaveProperty("name");
        expect(offer).toHaveProperty("slug");
        expect(offer).toHaveProperty("price");
        expect(offer).toHaveProperty("image");
        expect(offer).toHaveProperty("expiresin");
        expect(offer).toHaveProperty("offerProducts");
        expect(offer.offerProducts[0]).toHaveProperty("id");
        expect(offer.offerProducts[0]).toHaveProperty("quantity");
        expect(offer.offerProducts[0]).toHaveProperty("product");
        expect(offer.offerProducts[0].product).toHaveProperty("id");
        expect(offer.offerProducts[0].product).toHaveProperty("name");
        expect(offer.offerProducts[0].product).toHaveProperty("slug");
        expect(offer.offerProducts[0].product).toHaveProperty("image");
        expect(offer.offerProducts[0].product).toHaveProperty("productColors");
        expect(offer.offerProducts[0].product.productColors[0]).toHaveProperty("id");
        expect(offer.offerProducts[0].product.productColors[0]).toHaveProperty("name");
        expect(offer.offerProducts[0].product.productColors[0]).toHaveProperty("inventories");
        expect(offer.offerProducts[0].product.productColors[0].inventories[0]).toHaveProperty("id");
        expect(offer.offerProducts[0].product.productColors[0].inventories[0]).toHaveProperty("size");
    });
    
})