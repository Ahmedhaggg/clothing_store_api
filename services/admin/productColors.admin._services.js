let { ProductColor } = require("../../models/index");
exports.getProductColors = async query => await ProductColor
    .findAll({
        where: query,
        attributes: ["id", "name"]
    });

exports.addColorToProduct = async colorData => await ProductColor.create(colorData);
