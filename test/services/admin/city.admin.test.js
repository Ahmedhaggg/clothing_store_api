let governorateService = require("../../../services/admin/governorate.admin._service");
let cityService = require("../../../services/admin/city.admin._service");
let { governorateData, cityData, newCityData } = require("../../test.data");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");
describe('test all method in city service', () => {
    beforeAll(async () => {
        let newGovernorate = await governorateService.createGovernorate(governorateData);
        cityData.governorateId = newGovernorate.id;
    });
    afterAll(async () => {
        await db.query("DELETE FROM governorates", { type: QueryTypes.DELETE});
    });

    it('create city should return new object', async () => {
        let newCity = await cityService.createCity(cityData);
        cityData.id = newCity.id;
        expect(newCity).toHaveProperty("id");
        expect(newCity).toHaveProperty("name");
        expect(newCity).toHaveProperty("shippingTime");
        expect(newCity).toHaveProperty("shippingCost");
        expect(newCity).toHaveProperty("createdAt");
        expect(newCity).toHaveProperty("updatedAt");
    });

    it('getCity should return city attributes and governorates name and id', async () => {
        let city = await cityService.getCity({ id: cityData.id });
        console.log(JSON.stringify(city, 0, 4))
        expect(city).toHaveProperty("id");
        expect(city).toHaveProperty("name");
        expect(city).toHaveProperty("shippingCost");
        expect(city).toHaveProperty("shippingTime");
        expect(city).toHaveProperty("createdAt");
        expect(city).toHaveProperty("updatedAt");
        expect(city).toHaveProperty("governorate");        
    });

    it('getAllCities should return array length > 0', async () => {
        let cities = await cityService.getAllCities();
        expect(cities.length).toBeGreaterThan(0);        
    });

    it('updateCity should return true', async () => {
        let updateCity = await cityService.updateCity({ id: cityData.id }, newCityData);
        expect(updateCity).toBe(true);
    });
});