let userService = require("../../../services/users/auth.user._service");
let orderService = require("../../../services/users/order.user._service");
// let userProductService = require("../../../services/users/product.user._service");
let adminProductService = require("../../../services/admin/product.admin._service");
// let categoryService = require("../../../services/admin/category.admin._service");
// let subcategoryService = require("../../../services/admin/subcategory.admin_service");
// let adminOfferService = require("../../../services/admin/offer.admin._service");
// let userOfferService = require("../../../services/users/offer.user._service");
// let db = require("../../../config/database");
// const { QueryTypes } = require("sequelize"); 
let { 
    emailVerificationData,
    userData,
    addressData,
    productData, 
    productDetails, 
    productDiscountData, 
    categoryData, 
    subcategoryData, 
    secondProductData, 
    offerData, 
    offerProductsData ,
    orderData,
    orderProducts
} = require("../../test.data");

describe('test all method in orde user service', () => {
    beforeAll( async () => {
        let newUser = userService.createUser(userData, emailVerificationData);
        orderData.userId = newUser.id;
        
        let newCategory = await categoryService.createCategory(categoryData);
        productData.categoryId = newCategory.id;
    //     secondProductData.categoryId = newCategory.id;
    //     subcategoryData.categoryId = newCategory.id;
        let newSubcategory = await subcategoryService.createSubcategory(subcategoryData);
        productData.subcategoryId = newSubcategory.id;
    //     secondProductData.subcategoryId = newSubcategory.id;
        let firstProduct = await adminProductService.createProduct(productData, productDiscountData, productDetails);
        console.log(JSON.stringify(firstProduct.product, 0, 4));
        console.log(JSON.stringify(firstProduct.colors, 0, 4));
        console.log(JSON.stringify(firstProduct.inventory, 0, 4));

    //     let secondProduct = await adminProductService.createProduct(secondProductData, productDiscountData, productDetails);
    //     offerProductsData[1].productId = secondProduct.product.id;
    //     let offers = await adminOfferService.createOffer(offerData, offerProductsData);


    });
    
    // afterAll(async () => {
    //     await db.query("DELETE FROM products", { type: QueryTypes.DELETE});
    //     await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
    //     await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE});
    //     await db.query("DELETE FROM offers", { type: QueryTypes.DELETE});
    //     await db.query("DELETE FROM order", { type: QueryTypes.DELETE});
    // });

    it('createOrder should return orderData', async () => {
        // let newOrder = await orderService.createOrder(orderData, null, null, orderProducts);
        // console.log(JSON.stringify(newOrder, 0, 4));


    });

})