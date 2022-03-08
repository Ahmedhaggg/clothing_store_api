let { ProductColor } = require("../../models/index");

exports.createColor = async (colorData) => {
    let newColor = await ProductColor.create(colorData);
    return newColor;
}

exports.updateColors = async (id, newColorData) => {
    let updatedColor = await ProductColor.update(newColorData, { where: {id} });
    return updatedColor[0] === 1 ? true : false;
}

exports.deleteColors = async (id) => {
    let deletedColor = await ProductColor.destroy({ where: {id} });
    return deletedColor === 1 ? true : false;
}