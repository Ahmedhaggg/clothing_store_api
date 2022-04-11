let userCityService = require("../../../services/users/city.user._service");
let adminCtyService = require("../../../services/admin/city.admin._service");
let adminGovernorateService = require("../../../services/admin/governorate.admin._service");
let { governorateData, cityData } = require("../../test.data");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");

describe('test all methods in city service', () => {
    beforeAll(async () => {
        let newGovernorate = await adminGovernorateService.createGovernorate(governorateData);
        cityData.governorateId = newGovernorate.id;
        let newCity = await adminCtyService.createCity(cityData);
        cityData.id = newCity.id;
    });
    afterAll(async () => {
        await db.query("DELETE FROM governorates", { type: QueryTypes.DELETE});
    });

    it("getCity should return object", async () => {
        let city = await userCityService.getCity({ id: cityData.id });
        expect(city).toHaveProperty("id");
        expect(city).toHaveProperty("name");
        expect(city).toHaveProperty("shippingCost");
        expect(city).toHaveProperty("shippingTime");

    })
});