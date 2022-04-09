let authService = require("../../../services/users/auth.user._service");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");
let { hash, compare } = require("../../../helpers/hash");

// let hashing = require("../../../helpers/hash");
// let { addHoursToDate } = require("../../../helpers/date.handler")
let { userData, emailVerificationData, newEmailVerificationData } = require("../../test.data");

describe('test all method in auth services', () => {
    
    
    
    afterAll(async () => {
        db.query("DELETE from users", { type: QueryTypes.DELETE });
    });
    
    it('createUser should not throw error', async () => {
        let hashedPassword = await hash("Ahmekjfkjf333#")
        userData.password = hashedPassword;
        let newUser = await authService.createUser(userData, emailVerificationData);
        userData.id = newUser.id;
        expect(newUser).toHaveProperty("id");
    });
    
    it('updateUser should be true', async () => {
        let updateUser = await authService.updateUser({ id: userData.id }, { verified: true });
        expect(updateUser).toBe(true);
    });

    it('getUserIdAndEmailVerificationCode should return object', async () => {
        let emailVerificationCode = await authService.getUserIdAndEmailVerificationCode({ id: userData.id})
        expect(emailVerificationCode).toHaveProperty("code");
        expect(emailVerificationCode).toHaveProperty("id");
    });

    it('updateEmailVerification should not throw error', async () => {
        let updateEmailVerification = await authService.updateEmailVerification({ userId: userData.id }, newEmailVerificationData);
        expect(updateEmailVerification).toBe(true);
    });
    
    it('getUser should return object', async () => {
        let user = await authService.getUser({ id: userData.id });
        expect(user).toHaveProperty("id")
        expect(user).toHaveProperty("email", "ahmedhaggagrady@gmail.com")
        expect(user).toHaveProperty("password")
        expect(user).toHaveProperty("verified", true)
    });

    it('deleteEmailVerification should not throw error', async () => {
        let deleteEmailVerification = await authService.deleteEmailVerification({ userId: userData.id });
        expect(deleteEmailVerification).toBe(true);
    });
});