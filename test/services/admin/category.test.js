let categoryService = require("../../../services/admin/category.admin._service");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");
let { categoryData, newCategoryData } = require("../../test.data")
describe("test all method in category service", () => {


    afterAll(async () => {
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE})
    });
    it('createCategory should be defined and return object', async () => {
        let newCategory = await categoryService.createCategory(categoryData);
        categoryData.id = newCategory.id
        expect(newCategory).toHaveProperty("id");
        expect(newCategory).toHaveProperty("name");
        expect(newCategory).toHaveProperty("slug");
    });

    it('getAllCategories should return array has two object', async () => {
        let categories = await categoryService.getAllCategories();
        expect(categories.length).toBeGreaterThanOrEqual(0);
    });

    it('getCategory should return object contains category data', async () => {
        let category = await categoryService.getCategory({ id: categoryData.id });
        expect(category).toHaveProperty("id");
        expect(category).toHaveProperty("name");
        expect(category).toHaveProperty("slug");
        expect(category).toHaveProperty("subcategories");
        expect(category).toHaveProperty("products")
    });

    it('updateCategory should return true', async () => {
        let updateCategory = await categoryService.updateCategory({ id: categoryData.id }, newCategoryData);
        expect(updateCategory).toBe(true);
    });
}); 