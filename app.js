let express = require("express");
let config = require("./config/index")
let db = require("./config/database");
let helmet = require("helmet");
let logger = require("morgan");
let errorHandler = require("./middlewares/errorHandler");

// application
let app = express();

// use body parser 
app.use(express.urlencoded({extended: true}));
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


// create tables in database
/* 
    let {
    Admin,
    Category,
    Subcategory,
    Product,
    ProductColor,
    ProductDiscount,
    Inventory
// } = require("./models/index")

db.sync({ force: true});
*/
// include routes
db.sync();

// admin routes
let adminAuthRouter = require("./routes/admin/auth.admin.router");
let adminProductRouter = require("./routes/admin/product.admin.router");
let adminCategoryRouter = require("./routes/admin/category.admin.router");
let adminSubcategoryRouter = require("./routes/admin/subcategory.admin.router");
let adminproductColorsRouter = require("./routes/admin/productColor.admin.router");
// let adminInventoryRouter = require("./routes/admin/inventory.admin.router");
let adminProductDiscountRouter = require("./routes/admin/productDiscount.admin.router");
// users routes
// let authUserRouter = require("./routes/users/auth.user.router");
// let resetPasswordUserRouter = require("./routes/users/resetPassword.user.router");

// using admin routes
app.use("/api/admin/auth", adminAuthRouter);
app.use("/api/admin/products", adminProductRouter)
app.use("/api/admin/categories", adminCategoryRouter);
app.use("/api/admin/subcategories", adminSubcategoryRouter);
app.use("/api/admin/products/colors", adminproductColorsRouter);
app.use("/api/admin/products/discounts", adminProductDiscountRouter);
// app.use("/api/admin/inventories", adminInventoryRouter);

// using users routes
// app.use("/api/users/auth", authUserRouter);
// app.use("/api/users/password/reset/", resetPasswordUserRouter);


app.use(errorHandler);
// let port = config.PORT || 2000
app.listen(config.PORT, () => {
    console.log("server is running successfully");
})