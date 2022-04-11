let { ResetPassword } = require("../../models/index");
 
exports.getResetPassword = async query => await ResetPassword.findOne({ where: query });

exports.createResetPassword = async newResetPasswordData => await ResetPassword.create(newResetPasswordData);


exports.updateResetPassword = async (query, newData) => {
    let updatedResetPassword = await ResetPassword.update(newData, { where: query });

    return updatedResetPassword[0] === 1 ? true : false;
}
exports.deleteResetPassword = async query => {
    let deletedResetPassword = await ResetPassword.destroy({ where: query })
    return deletedResetPassword === 1 ? true : false;
};
