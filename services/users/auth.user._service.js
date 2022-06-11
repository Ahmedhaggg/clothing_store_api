let { User, EmailVerification } = require("../../models/index");
let db = require("../../config/database");
const { Op } = require("sequelize");


exports.createUser = async (newUserData, emailVerificationData) => {
    let newTransaction = await db.transaction();
    try {
        let newUser = await User.create(newUserData, { transaction: newTransaction });

        emailVerificationData.userId = newUser.id;
        
        await EmailVerification.create(emailVerificationData, { transaction: newTransaction});

        await newTransaction.commit();
        
        return { id: newUser.id };
    } catch (error) {
        
        await newTransaction.rollback();

        throw new Error(error);
    }
}

exports.updateUser = async (query, newData) => {
    let updatedUser = await User.update(newData, { where: query } );
    
    return updatedUser[0] === 1 ? true : false; 
}

exports.getUser = async query =>  await User
    .findOne({ 
        where: query,
        attributes: ["id", "email", "password", "verified", "username"]
    });


exports.getUserIdAndEmailVerificationCode = async query => {
    let user = await User.findOne({
        where: query,
        attributes: ["id"],
        include: {
            required: false,
            model: EmailVerification,
            where: { 
                expiresin: { [Op.gt]: new Date()}
            },
            attributes: ["code"]
        }
    });
    
    return  {
        code: user.email_verification.code,
        id: user.id
    };
}

exports.updateEmailVerification = async (query, newData) => {
    let updatedEmailVerification = await EmailVerification.update(newData, { where: query});
    return updatedEmailVerification[0] === 1 ? true : false;
}

exports.deleteEmailVerification = async query => {
    let deleteEmailVerification = await EmailVerification.destroy({
        where: query
    });
    return deleteEmailVerification === 1 ? true : false;
}

exports.getEmailVerification = async query => await EmailVerification
    .findOne({
        where: query,
        attributes: ["code", "expiresin"]
    });