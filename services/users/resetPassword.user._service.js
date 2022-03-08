let { ResetPassword } = require("../../models/index");


exports.createResetPassword = async (newResetPasswordData) => {
    await ResetPassword.create(newResetPasswordData);
}

exports.updateResetPassword = async (userId, newData) => {
    let updatedResetPassword = await ResetPassword.update(newData, { where: { userId } });

    return updatedResetPassword[0] === 1 ? true : false;
}

exports.deleteResetPassword = async (userId) => {
    let deletedResetPassword = await ResetPassword.destroy({ where: { userId } });

    return deletedResetPassword === 1 ? true : false;
}