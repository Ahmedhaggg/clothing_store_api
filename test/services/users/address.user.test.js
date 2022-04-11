let authService = require("../../../services/users/auth.user._service");
let userCityService = require("../../../services/users/city.user._service");
let adminCtyService = require("../../../services/admin/city.admin._service");
let adminGovernorateService = require("../../../services/admin/governorate.admin._service");
let userGovernorateService = require("../../../services/users/governorate.user._service");
let addressService = require("../../../services/users/address.user._service")
let { governorateData, cityData, addressData, newAddressData, userData, emailVerificationData } = require("../../test.data");
let { hash, compare } = require("../../../helpers/hash");

let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");

describe('test all method in address service', () => {

    beforeAll(async () => {
        let hashedPassword = await hash("Ahmekjfkjf333#")
        userData.password = hashedPassword;
        let newUser = await authService.createUser(userData, emailVerificationData);
        userData.id = newUser.id;
        addressData.userId = newUser.id;
        let newGovernorate = await adminGovernorateService.createGovernorate(governorateData);
        addressData.governorateId = newGovernorate.id;
        let newCity = await adminCtyService.createCity(cityData);
        addressData.cityId = newCity.id;
    });
    afterAll(async () => {
        await db.query("DELETE FROM users", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM governorates", { type: QueryTypes.DELETE});
        await db.query("DELETE FROM addresses", { type: QueryTypes.DELETE});

    });
    it('createAddress should return object', async () => {
        let newAddress = await addressService.createAddress(addressData);
        addressData.id = newAddress.id;
        expect(newAddress).toHaveProperty("id");
        expect(newAddress).toHaveProperty("firstZone");
        expect(newAddress).toHaveProperty("secondZone");
        expect(newAddress).toHaveProperty("cityId");
        expect(newAddress).toHaveProperty("governorateId");
        expect(newAddress).toHaveProperty("userId");
        expect(newAddress).toHaveProperty("createdAt");
        expect(newAddress).toHaveProperty("updatedAt");
    });

    it('getAddress should return object has address attributes and city name, and governorate name', async () => {
        let address = await addressService.getAddress({ id: addressData.id });
        expect(address).toHaveProperty("id");
        expect(address).toHaveProperty("firstZone");
        expect(address).toHaveProperty("secondZone");
        expect(address).toHaveProperty("city");
        expect(address).toHaveProperty("governorate");
        expect(address).toHaveProperty("userId");
        expect(address).toHaveProperty("createdAt");
        expect(address).toHaveProperty("updatedAt");
    });

    it("getUserAddresses should return array", async () => {
        let userAddresses = await addressService.getUserAddresses({ userId: userData.id });
        expect(userAddresses.length).toBeGreaterThan(0)
    })

    it("updateAddress should return true", async () => {
        let updateAddress = await addressService.updateAddress({ id: addressData.id }, newAddressData);
        expect(updateAddress).toBe(true);
    })
});