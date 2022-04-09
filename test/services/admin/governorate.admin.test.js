let governorateService = require("../../../services/admin/governorate.admin._service");
let { governorateData } = require("../../test.data");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");
describe('test all method in governorate service', () => {
    
    afterAll(async () => {
        await db.query("DELETE FROM governorates", { type: QueryTypes.DELETE});
    });

    it('create governorate should return new object', async () => {
        let newGovernorate = await governorateService.createGovernorate(governorateData);
        governorateData.id = newGovernorate.id;
        expect(newGovernorate).toHaveProperty("id");
        expect(newGovernorate).toHaveProperty("name");
        expect(newGovernorate).toHaveProperty("createdAt");
        expect(newGovernorate).toHaveProperty("updatedAt");
    });

    it('getGovernorate should return governorate attributes and cities', async () => {
        let governorate = await governorateService.getGovernorate({ id: governorateData.id });
        expect(governorate).toHaveProperty("id");
        expect(governorate).toHaveProperty("name");
        expect(governorate).toHaveProperty("createdAt");
        expect(governorate).toHaveProperty("updatedAt");
        expect(governorate).toHaveProperty("cities");        
    });

    it('getAllGovernorates should return array length > 0', async () => {
        let governorates = await governorateService.getAllGovernorates();
        expect(governorates.length).toBeGreaterThan(0);        
    });
});