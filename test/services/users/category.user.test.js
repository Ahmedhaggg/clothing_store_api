let adminCategoryService = require("../../../services/admin/category.admin._service");
let userCategoryService = require("../../../services/users/category.user._service");

let { categoryData, subcategoryData } = require("../../test.data");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");

describe('test all method in user category service', () => {
    
    beforeAll(async () => {
        await adminCategoryService.createCategory(categoryData)  
    });
    afterAll(async () => {
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
    });
    
    it('getAllCategories should return array conatins categories and subCategories foreach catgeory ', async () => {
        let catgeories = await userCategoryService.getAllCategories();
        expect(catgeories.length).toBeGreaterThan(0);
    });

    it("getCategory should return object conatins category attributes and thier subcategories", async () => {
        let category = await userCategoryService.getSubcategoriesOfcategory({ slug: categoryData.slug });
        expect(category).toHaveProperty("id");
        expect(category).toHaveProperty("name");
        expect(category).toHaveProperty("slug");
        expect(category).toHaveProperty("subcategories");
    })

});