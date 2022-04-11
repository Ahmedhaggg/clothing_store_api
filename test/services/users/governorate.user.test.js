let userCityService = require("../../../services/users/city.user._service");
let adminCtyService = require("../../../services/admin/city.admin._service");
let adminGovernorateService = require("../../../services/admin/governorate.admin._service");
let userGovernorateService = require("../../../services/users/governorate.user._service");
let { governorateData, cityData } = require("../../test.data");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");

describe('test all methods in governorate service', () => {
    beforeAll(async () => {
        let newGovernorate = await adminGovernorateService.createGovernorate(governorateData);
        governorateData.id = newGovernorate.id;
        cityData.governorateId = newGovernorate.id;
    });

    afterAll(async () => {
        await db.query("DELETE FROM governorates", { type: QueryTypes.DELETE});
    });

    it("getAllGovernorates should return array", async () => {
        let governorates = await userGovernorateService.getAllGovernorates();
        expect(governorates.length).toBeGreaterThan(0)
    })
    it("getGovernorate should return object", async () => {
        let governorate = await userGovernorateService.getGovernorate({ id: governorateData.id });
        expect(governorate).toHaveProperty("id");
        expect(governorate).toHaveProperty("name");
        expect(governorate).toHaveProperty("cities");

    })
});