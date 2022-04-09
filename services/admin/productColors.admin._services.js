let { ProductColor } = require("../../models/index");

exports.addColorToProduct = async colorData => await ProductColor.create(colorData);

exports.deleteColorfromProduct = async query => {
    let deletedColor = await ProductColor.destroy({ where: query });
    return deletedColor === 1 ? true : false;
}