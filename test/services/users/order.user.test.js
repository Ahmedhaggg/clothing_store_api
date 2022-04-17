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
    orderProductData,
    orderOfferData,
    orderOfferProductData,
    orderOfferProductColorsData
} = require("../../test.data");

describe('test all method in orde user service', () => {
    let transaction;
    let inventoryData;
    beforeAll( async () => {
        try {
        transaction = await db.transaction();
        userData.password = await hash("ahmed00000")
        let newUser = await userService.createUser(userData, emailVerificationData);
        orderData.userId = newUser.id;
        addressData.userId = newUser.id;
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
        orderOfferProductColorsData.forEach(orderProductColorData => { orderProductColorData.productColorId = firstProduct.colors[0].id })

        orderOfferProductData.productId = firstProduct.product.id;
        let newOffer = await adminOfferService.createOffer(offerData, offerProductsData);
        orderOfferData.offerId = newOffer.offer.id;
        } catch (error) {
            console.log(error);
        }

                //     let secondProduct = await adminProductService.createProduct(secondProductData, productDiscountData, productDetails);
    //     offerProductsData[1].productId = secondProduct.product.id;

    });
    
    afterAll(async () => {
        await db.query("DELETE FROM orders", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM offers", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM users", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM products", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
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
        orderData.id = newOrder.id;
        orderProductData.orderId = newOrder.id;
        orderOfferData.orderId = newOrder.id;
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
            }, colorData.quantity , transaction)
            return decrementInventoryColor;
        });
        let updateInventoriesResult =  await Promise.all(updateInventories);
        updateInventoriesResult.forEach(updateInventory => expect(updateInventory).toBe(true) );
    })

    it('createOrderOffer should object', async () => {
        let newOrderOffer = await orderService.createOrderOffer(orderOfferData, transaction);
        orderOfferProductData.orderOfferId = newOrderOffer.id;
        expect(newOrderOffer).toHaveProperty("id");
        expect(newOrderOffer).toHaveProperty("quantity");
        expect(newOrderOffer).toHaveProperty("pricePerUnit");
        expect(newOrderOffer).toHaveProperty("totalPrice");
        expect(newOrderOffer).toHaveProperty("orderId");
        expect(newOrderOffer).toHaveProperty("offerId");
    });

    it('createOrderOfferProduct should return object', async () => {
        let newOrderOfferProduct = await orderService.createOrderOfferProduct(orderOfferProductData, transaction);
        orderOfferProductColorsData.forEach(orderOfferProductColorData => orderOfferProductColorData.orderOfferProductId = newOrderOfferProduct.id );
        expect(newOrderOfferProduct).toHaveProperty("id");
        expect(newOrderOfferProduct).toHaveProperty("quantity");
        expect(newOrderOfferProduct).toHaveProperty("productId");
        expect(newOrderOfferProduct).toHaveProperty("orderOfferId");
    });
    it('createOrderOfferProductColors equel (createOrderProductColors)  should return array', async () => {
        let newOrderOfferProductColors = await orderService.createOrderProductColors(orderOfferProductColorsData, transaction);
        console.log(newOrderOfferProductColors);
        inventoryData = newOrderOfferProductColors;
        expect(newOrderOfferProductColors.length).toBe(2);
    });

    it("decrementInventory should return true", async () => {
        let updateInventories = inventoryData.map( colorData => {
            let decrementInventoryColor = inventoryService.decrementInventory({
                size: colorData.size,
                colorId: colorData.productColorId
            }, colorData.quantity , transaction)
            return decrementInventoryColor;
        });
        let updateInventoriesResult =  await Promise.all(updateInventories);
        updateInventoriesResult.forEach(updateInventory => expect(updateInventory).toBe(true) );
    })

    it("getUserOrders should return array", async () => {
        await transaction.commit();
        let orders = await orderService.getUserOrders({ userId: orderData.userId })
        expect(orders.length).toBe(1)
    })
    it("getOrder should return order attributes and details", async () => {
        let order = await orderService.getOrder({ id: orderData.id });
        console.log(JSON.stringify(order, 0, 4));
    })
    
})