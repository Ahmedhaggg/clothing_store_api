let Admin = require("./admin.model");
let ProductColor = require("./productColor.model");
let Product = require("./product.model");
let ProductDiscount = require("./productDiscount.model");
let Inventory = require("./inventory.model");
let Category = require("./category.model");
let Subcategory = require("./subcategory.model");
let User = require("./user.model");
let ResetPassword = require("./resetPassword.model");
let EmailVerification = require("./emailVerification.model");


/* =================== realtions ====================*/

// category and subcategory realtion
Category.hasMany(Subcategory, { foreignKey: "categoryId" })
Subcategory.belongsTo(Category);

// category and products realtion
Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category);

// subcategory and products realtion
Subcategory.hasMany(Product, { foreignKey: "subcategoryId" })
Product.belongsTo(Subcategory);

// product and colors realtion
Product.hasMany(ProductColor, { foreignKey: "productId", onUpdate: "cascade", onDelete: "cascade" });
ProductColor.belongsTo(Product);

// product and discount realtion
Product.hasOne(ProductDiscount, { foreignKey: "productId", onUpdate: "cascade", onDelete: "cascade" });
ProductDiscount.belongsTo(Product);

// product and inventory realtion
Product.hasMany(Inventory, { foreignKey: "productId", onUpdate: "cascade", onDelete: "cascade" });
Inventory.belongsTo(Product);


// user and verificationCode realtion
User.hasOne(EmailVerification, { foreignKey: "userId", onUpdate: "cascade", onDelete: "cascade" });
EmailVerification.belongsTo(User);

// user and verificationCode realtion
User.hasOne(ResetPassword, { foreignKey: "userId", onUpdate: "cascade", onDelete: "cascade" });
ResetPassword.belongsTo(User);

module.exports = {
    Admin,
    Category,
    Subcategory,
    Product,
    ProductColor,
    ProductDiscount,
    Inventory,
    User,
    EmailVerification,
    ResetPassword
};