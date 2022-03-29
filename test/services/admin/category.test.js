let categoryService = require("../../../services/admin/category.admin._service");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");
let { categoryData, newCategoryData } = require("../../test.data")
describe("test all method in category service", () => {

    beforeAll(async () => {
        let newCategory = await categoryService.createCategory(categoryData);
        categoryData.id = newCategory.id
    });

    afterAll(async () => {
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE})
    });
    it('createCategory should be defined and return object', async () => {
        let newCategory = await categoryService.createCategory({
            name: "fashion",
            slug: "fashion"
        });
        expect(newCategory).toHaveProperty("id");
        expect(newCategory).toHaveProperty("name", "fashion");
        expect(newCategory).toHaveProperty("slug", "fashion");
    });

    it('getAllCategories should return array has two object', async () => {
        let categories = await categoryService.getAllCategories();
        expect(categories.length).toBe(2);
    });

    it('getCategory should return object contains category data', async () => {
        let category = await categoryService.getCategory(categoryData.id);
        expect(category).toHaveProperty("name", categoryData.name);
        expect(category).toHaveProperty("slug", categoryData.slug);
        expect(category).toHaveProperty("subcategories");
    });

    it('updateCategory should return true', async () => {
        let updateCategory = await categoryService.updateCategory(categoryData.id, newCategoryData);
        expect(updateCategory).toBe(true);
    });

    it('getSubcategoriesName should return object contains array of subcategories', async () => {
        let category = await categoryService.getSubcategoriesName(categoryData.id);
        expect(category).toHaveProperty("subcategories");
    });
}); 