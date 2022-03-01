let { Subcategory } = require("../../models/index");

exports.createSubcategory = async subcategory => {
    await Subcategory. create(subcategory);
}