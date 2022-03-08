let adminAuthService = require("../../../services/admin/auth.admin._service");


describe('test all methods in auth admin service', () => {

    let adminData = {
        email: "elwensh@gmail.com",
        password: "Admin.Test@0000"
    }
    
    it('create admin should not throw error', async () => {
        let newAdmin = await adminAuthService.createAdmin(admin);
        expect(newAdmin).resolves.not.toThrow();
    });
    it("getAdmin should return new admin", async () => {
        let admin = adminAuthService.getAdmin(adminData.email);
        expect(admin.email).toEquel(adminData.email);
        expect(admin).toHaveProperty("password");
    })
    
});