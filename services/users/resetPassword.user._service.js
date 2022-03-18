let { ResetPassword } = require("../../models/index");
 
exports.getResetPassword = async query => {
    return await ResetPassword.findOne({ where: query });
}

exports.createResetPassword = async newResetPasswordData => {
    await ResetPassword.create(newResetPasswordData);
}

exports.updateResetPassword = async (query, newData) => {
    await ResetPassword.update(newData, { where: query });
}

exports.deleteResetPassword = async query => {
    await ResetPassword.destroy({ where: query });
}