let authService = require("../../../services/users/auth.user._service");
let resetPasswordservice = require("../../../services/users/resetPassword.user._service");
let db = require("../../../config/database");
const { QueryTypes } = require("sequelize");
let generateRandomToken = require("../../../helpers/generateRandomToken")
let { addHoursToDate } = require("../../../helpers/date.handler")
describe('test all method in auth services', () => {
    let userId;

    afterAll( () => {
        db.query("DELETE from users", { type: QueryTypes.DELETE });
    });

    beforeAll(async () => {
        await authService.createUser(
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
        let user = await authService.getUser({ email: "ahmedhaggagrady@gmail.com"});
        userId = user.id;
    });
    it('createResetPassword should not throw error', async () => {
        let newResetPassword = await resetPasswordservice.createResetPassword({
            token: generateRandomToken(),
            expiresin: new Date(),
            userId
        });
        expect(newResetPassword).toBeUndefined()
    });

    it('getResetPassword should not throw error ', async () => {
        let resetPassword = await resetPasswordservice.getResetPassword({ userId });
        expect(resetPassword).toHaveProperty("id");
        expect(resetPassword).toHaveProperty("token");
        expect(resetPassword).toHaveProperty("expiresin");
        expect(resetPassword).toHaveProperty("userId");

    });

    it('updateResetPassword should not throw error ', async () => {
        let updateResetPassword = await resetPasswordservice.updateResetPassword({ userId }, { token: generateRandomToken()});
        expect(updateResetPassword).toBeUndefined()
    });

    it('deleteResetPassword should not throw error ', async () => {
        let deleteResetPassword = await resetPasswordservice.deleteResetPassword({ userId });
        expect(deleteResetPassword).toBeUndefined()
    });
})