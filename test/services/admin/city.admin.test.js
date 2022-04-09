let cityService = require("../../../services/admin/city.admin._service");

describe('test all methods in city service', () => {

    beforeAll(async () => {
        
    });
    afterAll(async () => {
        await db.query("DELETE FROM products", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM categories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM subcategories", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM offers", { type: QueryTypes.DELETE});
    });
});