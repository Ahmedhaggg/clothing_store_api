let subcategoryService = require("../../../services/admin/subcategory.admin_service");
let categoryService = require("../../../services/admin/category.admin._service");
let { categoryData, newCategoryData , subcategoryData, newSubcategoryData} = require("../../test.data")

let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");

describe("test all method in subcategory service", () => {
    beforeAll(async () => {
        let newCategory = await categoryService.createCategory(categoryData);
        categoryData.id = newCategory.id;
        subcategoryData.categoryId = newCategory.id
        let newSubcategory = await subcategoryService.createSubcategory(subcategoryData);
        subcategoryData.id = newSubcategory.id;
    });

    afterAll(async () => {
        await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE})
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE})
    });

    it('createSubcategory should be defined and return object', async () => {
        let newSubcategory = await subcategoryService.createSubcategory({
            name: "sweet shirt a",
            slug: "sweet-shirt-a",
            categoryId: categoryData.id
        });
        expect(newSubcategory).toHaveProperty("id");
        expect(newSubcategory).toHaveProperty("name", "sweet shirt a");
        expect(newSubcategory).toHaveProperty("slug", "sweet-shirt-a");
        expect(newSubcategory).toHaveProperty("categoryId", categoryData.id);
    });

    it('getSubcategory should return object', async () => {
        let subcategory = await subcategoryService.getSubcategory(subcategoryData.id);
        expect(subcategory).toHaveProperty("id")
        expect(subcategory).toHaveProperty("name", subcategoryData.name)
        expect(subcategory).toHaveProperty("slug", subcategoryData.slug)
        expect(subcategory).toHaveProperty("products")
    });

    it('updateSubcategory should return true', async () => {
        let updateSubcategory = await subcategoryService.updateSubcategory(subcategoryData.id, newSubcategoryData);
        expect(updateSubcategory).toBe(true);
    });
}); 