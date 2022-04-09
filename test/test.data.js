let { hash, compare } = require("../helpers/hash");
let { addHoursToDate } = require("../helpers/date.handler")
let generateRandomToken = require("../helpers/generateRandomToken")
let password = async () => await hash("Ahmed@12345");

exports.adminData = {
    email: "elwensh@gmail.com",
    password: "Admin.Test@0000"
}
// product`
exports.productData = {
    name: "sweet shirt",
    slug: "sweet-shirt",
    description: "new style sweet shirt",
    price: 4.2,
    image: "newProduct.jpeg"
}
exports.secondProductData = {
    name: "sweet shirt zara",
    slug: "sweet-shirt-zara",
    description: "new style sweet shirt",
    price: 4.2,
    image: "newProduct.jpeg"
}
exports.newProductData = {
    name: "new sweet shirt",
    slug: "new-sweet-shirt",
}

// disocunt
exports.productDiscountData = {
    percent: 10,
    description: "this is new description",
    expiresin: "2022-12-14"
}
exports.newProductDiscountData = {
    percent: 20,
    description: "this is new description",
    expiresin: "2022-12-14"
}

// category 
exports.categoryData = {
    name: "sweet shirt",
    slug: "sweet-shirt"
}
exports.newCategoryData = {
    name: "new sweet shirt",
    slug: "new-sweet-shirt"
}

// subcategory
exports.subcategoryData = {
    name: "sweet shirt",
    slug: "sweet-shirt"
}
exports.newSubcategoryData = {
    name: "new sweet shirt",
    slug: "new-sweet-shirt"
}

// product color
exports.productDetails = [
    {name: "blue", size: "xl", quantity: 10},
    {name: "yellow", size: "lg", quantity: 10}
]
exports.productDetails = [
    {
        color: "green", 
        sizes: [
            {
                size: "xl", quantity: 10
            },
            {
                size: "lg", quantity: 10
            }
        ]   
    },
    {
        color: "yellow", 
        sizes: [
            {
                size: "xl", quantity: 10
            },
            {
                size: "lg", quantity: 10
            }
        ]   
    }
]

// inventory
exports.inventoryData = [
    {size: "xl", quantity: 10},
    {size: "lg", quantity: 10}
]
exports.newInventoryData = [
    {size: "xl", quantity: 20},
    {size: "lg", quantity: 20}
]

// user
exports.userData = {
    firstName: "ahmed",
    lastName: "haggag",
    userName: "ahmed_haggag",
    password: password(),
    email: "ahmedhaggagrady@gmail.com",
    phoneNumber: "01014223925",
    gender: "male",
    birthDay: new Date()
}

// code verification
exports.codeVerificationData = {
    code: 123456,
    expiresin: addHoursToDate(new Date(), 2)
}

// reset password
exports.resetPasswordData = {
    token: generateRandomToken(),
    expiresin: new Date()
}

exports.offerData = {
    name: "sweet shirt",
    slug: "sweet-shirt",
    description: "new style sweet shirt",
    price: 34.99,
    image: "newProduct.jpeg",
    expiresin: "2022-10-4"
}

exports.newOfferData = {
    price: 39.99
}
exports.offerProductsData = [
    {
        quantity: 1
    },
    { 
        quantity: 2
    }
]
exports.offerProductData = {
    quantity: 1
}
exports.newOfferProductData = {
    quantity: 2
}
exports.governorateData = {
    name: "beni suef"
}
exports.cityData = {
    name: "beba",
    shippingTime: "3days",
    shippingCost: 40,
}

exports.newCityData = {
    shippingCost: 60
}