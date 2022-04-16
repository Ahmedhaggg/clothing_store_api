let userService = require("../../../services/users/auth.user._service");
let addressService = require("../../../services/users/address.user._service");
let { hash } = require("../../../helpers/hash");
let orderService = require("../../../services/users/order.user._service");
// let userProductService = require("../../../services/users/product.user._service");
let adminProductService = require("../../../services/admin/product.admin._service");
let categoryService = require("../../../services/admin/category.admin._service");
let subcategoryService = require("../../../services/admin/subcategory.admin_service");
// let adminOfferService = require("../../../services/admin/offer.admin._service");
// let userOfferService = require("../../../services/users/offer.user._service");
let db = require("../../../config/database");
let inventoryService = require("../../../services/users/inventory.user._service");
const { QueryTypes } = require("sequelize"); 
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
    orderProductColorsData,
    orderProductData
} = require("../../test.data");

describe('test all method in orde user service', () => {
    let transaction;
    let inventoryData;
    beforeAll( async () => {
        transaction = await db.transaction();
        userData.password = await hash("ahmed00000")
        let newUser = userService.createUser(userData, emailVerificationData);
        orderData.userId = newUser.id;
        let newAddress = await addressService.createAddress(addressData);
        orderData.addressId = newAddress.id;
        let newCategory = await categoryService.createCategory(categoryData);
        productData.categoryId = newCategory.id;
    //     secondProductData.categoryId = newCategory.id;
    //     subcategoryData.categoryId = newCategory.id;
        let newSubcategory = await subcategoryService.createSubcategory(subcategoryData);
        productData.subcategoryId = newSubcategory.id;
    //     secondProductData.subcategoryId = newSubcategory.id;
        let firstProduct = await adminProductService.createProduct(productData, productDiscountData, productDetails);
        orderProductData.productId = firstProduct.product.id;
        orderProductColorsData.forEach(orderProductColorData => { orderProductColorData.productColorId = firstProduct.colors[0].id })
        console.log(JSON.stringify(firstProduct.product, 0, 4));
        console.log(JSON.stringify(firstProduct.colors, 0, 4));
        console.log(JSON.stringify(firstProduct.inventory, 0, 4));

    //     let secondProduct = await adminProductService.createProduct(secondProductData, productDiscountData, productDetails);
    //     offerProductsData[1].productId = secondProduct.product.id;
    //     let offers = await adminOfferService.createOffer(offerData, offerProductsData);


    });
    
    afterAll(async () => {
        await db.query("DELETE FROM products", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM offers", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM orders", { type: QueryTypes.DELETE});
    });

    it('createOrder should return object', async () => {
        let newOrder = await orderService.createOrder(orderData, transaction);
        expect(newOrder).toHaveProperty("id");
        expect(newOrder).toHaveProperty("status");
        expect(newOrder).toHaveProperty("amount");
        expect(newOrder).toHaveProperty("paymentId");
        expect(newOrder).toHaveProperty("addressId");
        expect(newOrder).toHaveProperty("createdAt");
        expect(newOrder).toHaveProperty("updatedAt");
        orderProductData.orderId = newOrder.id;
    });

    it('createOrderProduct should return object', async () => {
        let newOrderProduct = await orderService.createOrderProduct(orderProductData, transaction);
        expect(newOrderProduct).toHaveProperty("id");
        expect(newOrderProduct).toHaveProperty("productId");
        expect(newOrderProduct).toHaveProperty("quantity");
        expect(newOrderProduct).toHaveProperty("pricePerUnit");
        expect(newOrderProduct).toHaveProperty("totalPrice");
        expect(newOrderProduct).toHaveProperty("orderId");
        orderProductColorsData.forEach(orderProductColorData => orderProductColorData.orderProductId = newOrderProduct.id );
    });
    it('createOrderProductColors should return array', async () => {
        let newOrderProductColors = await orderService.createOrderProductColors(orderProductColorsData, transaction);
        inventoryData = newOrderProductColors;
        expect(newOrderProductColors.length).toBe(2);
    });

    it("decrementInventory should return true", async () => {
        let updateInventories = inventoryData.map( colorData => {
            let decrementInventoryColor = inventoryService.decrementInventory({
                size: colorData.size,
                colorId: colorData.productColorId
            }, -22 , transaction)
            return decrementInventoryColor;
        });
        let updateInventoriesResult =  await Promise.all(updateInventories);
        updateInventoriesResult.forEach(updateInventory => expect(updateInventory).toBe(true) );
        await transaction.commit();
        console.log(await inventoryService.getInventoryProduct({ productId: orderProductData.productId }))
    })

    
})