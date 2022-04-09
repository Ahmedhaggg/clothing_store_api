let offerService = require("../../../services/admin/offer.admin._service");
let productService = require("../../../services/admin/product.admin._service");
let categoryService = require("../../../services/admin/category.admin._service");
let subcategoryService = require("../../../services/admin/subcategory.admin_service");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");
let {categoryData, subcategoryData, productData, productDiscountData, productDetails, offerData, newOfferData, offerProductsData, secondProductData } = require("../../test.data")
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
        offerProductsData[1].productId = secondProduct.product.id;
    });
    
    afterAll(async () => {
        await db.query("DELETE FROM products", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM offers", { type: QueryTypes.DELETE});
    });

    it('createOffer should return object', async () => {
        let newOffer = await offerService.createOffer(offerData, offerProductsData);
        offerData.id = newOffer.offer.id;
        expect(newOffer).toHaveProperty("offer");
        expect(newOffer).toHaveProperty("offerProducts");
    });
    it("getAllOffer should return array contains offer attributes", async () => {
        let offers = await offerService.getAllOffers({ active: true });
        expect(offers.length).toBeGreaterThanOrEqual(1);
    })
    it("getOffer should return object of offer contains all data", async () => {
        let offer = await offerService.getOffer({ id: offerData.id });
        console.log(JSON.stringify(offer, null, 4))
        expect(offer).toHaveProperty("id");
        expect(offer).toHaveProperty("name");
        expect(offer).toHaveProperty("slug");
        expect(offer).toHaveProperty("price");
        expect(offer).toHaveProperty("description");
        expect(offer).toHaveProperty("image");
        expect(offer).toHaveProperty("active");
        expect(offer).toHaveProperty("createdAt");
        expect(offer).toHaveProperty("expiresin");
        expect(offer).toHaveProperty("updatedAt");
        expect(offer).toHaveProperty("offerProducts");
    })

    it("updateOffer should return true", async () => {
        let updateOffer = await offerService.updateOffer({ id: offerData.id }, newOfferData)
        expect(updateOffer).toBe(true);
    })

    it(`getSomeOfferData should return price ${newOfferData.id}`, async () => {
        let offer = await offerService.getSomeOfferData({ id: offerData.id }, ["price"]);
        expect(offer).toHaveProperty("price", newOfferData.price);
    })
});