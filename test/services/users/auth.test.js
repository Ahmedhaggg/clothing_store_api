let authService = require("../../../services/users/auth.user._service");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");
let hashing = require("../../../helpers/hash");
let { addHoursToDate } = require("../../../helpers/date.handler")
describe('test all method in auth services', () => {
    
    
    
    afterAll(async () => {
        db.query("DELETE from users", { type: QueryTypes.DELETE });
    });
    
    it('createUser should not throw error', async () => {
        let createUser = await authService.createUser(
            {
                firstName: "ahmed",
                lastName: "haggag",
                userName: "ahmed_haggag",
                password: "Aekldkdld@djkdk",
                email: "ahmedhaggagrady@gmail.com",
                phoneNumber: "01014223925",
                gender: "male",
                birthDay: new Date()
            },
            {
                code: 123456,
                expiresin: addHoursToDate(new Date(), 2)
            }
        );
        expect(createUser).toBeUndefined();
    });
    
    it('updateUser should be true', async () => {
        let updateUser = await authService.updateUser({ email: "ahmedhaggagrady@gmail.com" }, { verified: true });
        expect(updateUser).toBe(true);
    });

    it('getUserIdAndEmailVerificationCode should return object', async () => {
        let emailVerificationCode = await authService.getUserIdAndEmailVerificationCode({ email: "ahmedhaggagrady@gmail.com"})
        expect(emailVerificationCode).toHaveProperty("code", 123456);
        expect(emailVerificationCode).toHaveProperty("id");
    });

    it('updateEmailVerification should not throw error', async () => {
        let updateEmailVerification = await authService.updateEmailVerification({ code: 123456}, { expiresin: new Date()});
        expect(updateEmailVerification).toBeUndefined();
    });
    
    it('getUser should return object', async () => {
        let user = await authService.getUser({ email: "ahmedhaggagrady@gmail.com" });
        expect(user).toHaveProperty("id")
        expect(user).toHaveProperty("email", "ahmedhaggagrady@gmail.com")
        expect(user).toHaveProperty("password")
        expect(user).toHaveProperty("verified", true)
    });

    it('deleteEmailVerification should not throw error', async () => {
        let deleteEmailVerification = await authService.deleteEmailVerification({ code: 123456});
        expect(deleteEmailVerification).toBeUndefined();
    });
});