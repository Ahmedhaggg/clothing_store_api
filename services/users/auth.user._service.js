let { User, EmailVerification } = require("../../models/index");
let db = require("../../config/database");


exports.createUser = async (newUserData, emailVerificationData) => {
    let newTransaction = await db.transaction();

    try {
        let newUser = await User.create(newUserData, { transaction: newTransaction });
        
        emailVerificationData.userId = newUser.isSoftDeleted;
        await EmailVerification.create(emailVerificationData);

        await newTransaction.commit();
        
        return true;
    } catch (error) {
        await newTransaction.rollback();

        return false;
    }
}

exports.updateUser = async (email, newData) => {
    let updatedUser = await User.update(newData, { where: { email }} );
    
    return updatedUser[0] === 1 ? true : false; 
}

exports.getUser = async query => {
    let user = await User.findOne({ 
        where: query,
        attributes: ["id", "email", "password", "verified"]
    });
    
    return user;
}