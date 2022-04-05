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
let Offer = require("./offer.model");
let OfferProducts = require("./offer_product.model");
let Order = require("./order.model");
let OrderOffer = require("./orderOffer.model");
let OrderProduct = require("./orderProduct.model");
let Address = require("./address.model");
let City = require("./city.model");
let Governorate = require("./emailVerification.model");
let Shipper = require("./shipper.model");
let Shipping = require("./shipping.model");
let OrderOfferProduct = require("./orderOfferProdcut.model");
const db = require("../config/database");

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

// product color and inventory
ProductColor.hasOne(Inventory, { foreignKey: "colorId", onUpdate: "cascade", onDelete: "cascade" });
Inventory.belongsTo(ProductColor);

// user and verificationCode realtion
User.hasOne(EmailVerification, { foreignKey: "userId", onUpdate: "cascade", onDelete: "cascade" });
EmailVerification.belongsTo(User);

// user and verificationCode realtion
User.hasOne(ResetPassword, { foreignKey: "userId", onUpdate: "cascade", onDelete: "cascade" });
ResetPassword.belongsTo(User);

// offer and offer Products realtion
Offer.hasMany(OfferProducts, { foreignKey: "offerId", onUpdate: "cascade", onDelete: "cascade" });
OfferProducts.belongsTo(Offer);

// offer Products and products realtion
Product.hasMany(OfferProducts, { foreignKey: "productId", onUpdate: "cascade", onDelete: "cascade" })
OfferProducts.belongsTo(Product);

// user and address realtion
User.hasMany(Address, { foreignKey: "userId", onUpdate: "cascade", onDelete: "cascade"});
Address.belongsTo(User);

// city and address realtion
Governorate.hasMany(City, { foreignKey: "governorateId", onUpdate: "cascade", onDelete: "cascade"})
City.belongsTo(Governorate);

// city and address realtion
City.hasMany(Address, { foreignKey: "cityId", onUpdate: "cascade", onDelete: "cascade"})
Address.belongsTo(City);

// governorate and address realtion
Governorate.hasMany(Address, { foreignKey: "governorateId", onUpdate: "cascade", onDelete: "cascade"})
Address.belongsTo(Governorate);

// order and order offer realtion
Order.hasMany(OrderOffer, { foreignKey: "orderId", onUpdate: "cascade", onDelete: "cascade"});
OrderOffer.belongsTo(Order);

// order and order product realtion
Order.hasMany(OrderProduct, { foreignKey: "orderId", onUpdate: "cascade", onDelete: "cascade"});
OrderProduct.belongsTo(Order);

// order and order offer realtion
Offer.hasMany(OrderOffer, { foreignKey: "offerId", onUpdate: "cascade", onDelete: "cascade"});
OrderOffer.belongsTo(Offer);

// order offer and order product realtion
OrderOffer.hasMany(OrderProduct, { foreignKey: "orderOfferId", onUpdate: "cascade", onDelete: "cascade" });
OrderProduct.belongsTo(OrderOffer);

Order.hasOne(Shipping, { foreignKey: "orderId", onUpdate: "cascade", onDelete: "cascade" })
Shipping.belongsTo(Order);

Shipper.hasOne(Shipping, { foreignKey: "shipperId", onUpdate: "cascade", onDelete: "cascade" })
Shipping.belongsTo(Shipper);

Address.hasMany(Order, { foreignKey: "addressId", onUpdate: "cascade", onDelete: "cascade" })
Order.belongsTo(Address);


OrderOffer.hasMany(OrderOfferProduct, { foreignKey: "orderOfferId", onUpdate: "cascade", onDelete: "cascade"})
OrderOfferProduct.belongsTo(OrderOffer);

Product.hasMany(OrderOfferProduct, { foreignKey: "productId", onUpdate: "cascade", onDelete: "cascade"})
OrderOfferProduct.belongsTo(Product);

Product.hasMany(OrderProduct, { foreignKey: "productId", onUpdate: "cascade", onDelete: "cascade"})
OrderProduct.belongsTo(Product);

// db.drop();

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
    Shipper
};