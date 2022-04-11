let authService = require("../../../services/users/auth.user._service");
let resetPasswordservice = require("../../../services/users/resetPassword.user._service");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");
let generateRandomToken = require("../../../helpers/generateRandomToken")
let { addHoursToDate } = require("../../../helpers/date.handler")
let { governorateData, cityData, addressData, newAddressData, userData, emailVerificationData, resetPasswordData, newResetPasswordData } = require("../../test.data");
let { hash, compare } = require("../../../helpers/hash");

describe('test all method in auth services', () => {

    beforeAll(async () => {
        let hashedPassword = await hash("Ahmekjfkjf333#");
        userData.password = hashedPassword;
        let newUser = await authService.createUser(userData, emailVerificationData);
        userData.id = newUser.id;
        resetPasswordData.userId = userData.id;
    });

    afterAll( () => {
        db.query("DELETE from users", { type: QueryTypes.DELETE });
    });

    it('createResetPassword should not throw error', async () => {
        let newResetPassword = await resetPasswordservice.createResetPassword(resetPasswordData);
        expect(newResetPassword).toHaveProperty("id");
        expect(newResetPassword).toHaveProperty("token");
        expect(newResetPassword).toHaveProperty("expiresin");
        expect(newResetPassword).toHaveProperty("userId");    
        expect(newResetPassword).toHaveProperty("createdAt");
        expect(newResetPassword).toHaveProperty("updatedAt");
    });

    it('getResetPassword should not throw error ', async () => {
        let resetPassword = await resetPasswordservice.getResetPassword({ userId: userData.id });
        expect(resetPassword).toHaveProperty("id");
        expect(resetPassword).toHaveProperty("token");
        expect(resetPassword).toHaveProperty("expiresin");
        expect(resetPassword).toHaveProperty("userId");
        expect(resetPassword).toHaveProperty("createdAt");
        expect(resetPassword).toHaveProperty("updatedAt");

    });

    it('updateResetPassword should not throw error ', async () => {
        let updateResetPassword = await resetPasswordservice.updateResetPassword({ userId: userData.id }, newResetPasswordData);
        expect(updateResetPassword).toBe(true)
    });

    it('deleteResetPassword should not throw error ', async () => {
        let deleteResetPassword = await resetPasswordservice.deleteResetPassword({ userId: userData.id });
        expect(deleteResetPassword).toBe(true)
    });
})