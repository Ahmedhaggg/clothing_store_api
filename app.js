let express = require("express");
let config = require("./config/index")
let db = require("./config/database");
let helmet = require("helmet");
let logger = require("morgan");
let errorHandler = require("./middlewares/errorHandler");
let cors = require("cors");
// application
let app = express();

// cors
app.use(cors()); 

// use body parser 
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// use helmet middleware
app.use(helmet());

// use logger for logging requests
app.use(logger("common"));


// database conection
db.authenticate()
.then(() => {
    console.log("database connecting successfully");
})
.catch(err => {
    console.log(err);
})

let {
    Admin,
    Category,
    Subcategory,
    Product,
    ProductColor,
    ProductDiscount,
    Inventory,
    User,
    EmailVerification,
    ResetPassword,
    Offer,
    OfferProducts,
    Order,
    OrderProduct,
    OrderOffer,
    OrderOfferProduct,
    Address,
    City,
    Governorate,
    Shipping,
    Shipper,
    OrderProductColor,
    ProductReview,
    OfferReview
} = require("./models");
// db
//   .sync({ force: false }) 
// create the database table for our model(s)

 
// admin routes
let adminAuthRouter = require("./routes/admin/auth.admin.router");
let adminProductRouter = require("./routes/admin/product.admin.router");
let adminCategoryRouter = require("./routes/admin/category.admin.router");
let adminSubcategoryRouter = require("./routes/admin/subcategory.admin.router");
let adminproductColorsRouter = require("./routes/admin/productColor.admin.router");
let adminInventoryRouter = require("./routes/admin/inevntory.admin.router");
let adminProductDiscountRouter = require("./routes/admin/productDiscount.admin.router");
let adminOfferRouter = require("./routes/admin/offer.admin.router");
let adminOfferProductRouter = require("./routes/admin/offerProduct.admin.router");
let adminGovernorateRouter = require("./routes/admin/governorate.admin.router");
let adminCityRouter = require("./routes/admin/city.admin.router");
let adminOrderRouter = require("./routes/admin/order.admin.router");
let adminShipperRouter = require("./routes/admin/shipper.admin.router");
let adminOfferReviewRouter = require("./routes/admin/offerReview.admin.router");
let adminProductReviewRouter = require("./routes/admin/productReview.admin.router");
let adminUserRouter = require("./routes/admin/users.admin.router");
let adminsalesRouter = require("./routes/admin/sales.admin.router")

// // using admin routes
app.use("/api/admin/auth", adminAuthRouter); 
app.use("/api/admin/products", adminProductRouter)
app.use("/api/admin/categories", adminCategoryRouter);
app.use("/api/admin/subcategories", adminSubcategoryRouter);
app.use("/api/admin/products", adminproductColorsRouter);
app.use("/api/admin/products/discounts", adminProductDiscountRouter);
app.use("/api/admin/inventories", adminInventoryRouter);
app.use("/api/admin/offers", adminOfferRouter)
app.use("/api/admin/offers/offerProducts", adminOfferProductRouter);
app.use("/api/admin/governorates", adminGovernorateRouter);
app.use("/api/admin/cities", adminCityRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/admin/shippers", adminShipperRouter);
app.use("/api/admin", adminOfferReviewRouter);
app.use("/api/admin", adminProductReviewRouter);
app.use("/api/admin/users", adminUserRouter)
app.use("/api/admin/sales", adminsalesRouter)

// // users routes
let userAuthRouter = require("./routes/users/auth.user.router");
let userResetPasswordRouter = require("./routes/users/resetPassword.user.router");
let userAddressRouter = require("./routes/users/address.user.router");
let userProductRouter = require("./routes/users/product.user.router");
let userCategoryRouter = require("./routes/users/category.user.router");
let userSubcategoryRouter = require("./routes/users/subcategory.user.router");
let userGovernorateRouter = require("./routes/users/governorate.user.router");
let userCityRouter = require("./routes/users/city.user.router");
let userOrderRouter = require("./routes/users/order.user.router");
let userOfferReviewRouter = require("./routes/users/offerReview.user.router")
let userProductReviewRouter = require("./routes/users/productReview.user.router")
let userprofileReviewRouter = require("./routes/users/profile.user.router")
let userPurchasesReviewRouter = require("./routes/users/purchases.user.router")

// using users routes
app.use("/api/users/auth", userAuthRouter);
app.use("/api/users/reset-passwords", userResetPasswordRouter);
app.use("/api/users/addresses", userAddressRouter);
app.use("/api/users/products", userProductRouter);
app.use("/api/users/categories", userCategoryRouter);
app.use("/api/users/subcategories", userSubcategoryRouter);
app.use("/api/users/governorates", userGovernorateRouter);
app.use("/api/users/cities", userCityRouter);
app.use("/api/users/orders", userOrderRouter);
app.use("/api/users/products", userProductReviewRouter);
app.use("/api/users/offers", userOfferReviewRouter);
app.use("/api/users", userprofileReviewRouter);
app.use("/api/users/purchases", userPurchasesReviewRouter);


app.use(errorHandler);
// let port = config.PORT || 2000
app.listen(config.PORT, (port) => {
    console.log("server is running successfully", port);
})


