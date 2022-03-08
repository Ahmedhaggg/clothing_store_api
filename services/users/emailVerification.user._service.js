let { EmailVerification } = require("../../models/index");


exports.updateEmailVerification = async (email, newData) => {
    let updatedEmailVerification = await EmailVerification.update({});

    return updatedEmailVerification === 1 ? true : false;
}

