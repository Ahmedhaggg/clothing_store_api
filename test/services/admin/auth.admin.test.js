let adminAuthService = require("../../../services/admin/auth.admin._service");
let { adminData } = require("../../test.data")
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");
describe('test all methods in auth admin service', () => {
    
    afterAll(async () => {
        await db.query("DELETE FROM admins", { type: QueryTypes.DELETE});
    });
    it('create admin should return object conatins new admin data', async () => {
        let newAdmin = await adminAuthService.createAdmin(adminData);
        expect(newAdmin).toHaveProperty("id");
        expect(newAdmin).toHaveProperty("email");
        expect(newAdmin).toHaveProperty("password");
    });
    it("getAdmin should return admin data", async () => {
        let admin = await adminAuthService.getAdmin(adminData.email);
        console.log(admin)
        expect(admin).toHaveProperty("id");
        expect(admin).toHaveProperty("email");
        expect(admin).toHaveProperty("password");
    })
    
});