let authService = require("../../services/users/auth.user._service");
let resetPasswordService = require("../../services/users/resetPassword.user._service");
let sendEmail = require("../../helpers/sendEmail")
let { addHoursToDate } = require("../../helpers/date.handler");
let hashing = require("../../helpers/hash");
let generateRandomToken = require("../../helpers/generateRandomToken");
let { createJwtToken, getDataFromJwtToken } = require("../../helpers/jwtToken")
  
exports.create = async (req, res, next) => {
    let { frontUrl, email } = req.body;

    let user = await authService.getUser({ email });

    if (!user || user.verified === false)
        return res.status(404).json({
            success: false,
            message: "email is not used"
        });

    
    let token = generateRandomToken();
    let expiresin = addHoursToDate(new Date(), 1)

    let getOldToken = await resetPasswordService.getResetPassword({ userId: user.id});
    
    !getOldToken ?
        await resetPasswordService.createResetPassword({ token, expiresin, userId: user.id })
            :
        await resetPasswordService.updateResetPassword({userId: user.id}, { token, expiresin});  
    
    await sendEmail({
        to: email,
        subject: "visit next link to reset your password",
        html: `
            <p>link to reset password : <a href="${frontUrl}/${token}">${frontUrl}/${token}</a></p>
        `
    })

    res.status(201).json({
        success: true,
        message: "verify your email to reset your password"
    })
}

exports.verify = async (req, res, next) => {
    let userId = req.user.id;
    let { token } = req.params;

    let getTokenData = await resetPasswordService.getResetPassword({ token });
    
    if (!getTokenData)
        return res.status(404).json({
            success: false,
            message: "invalid token"
        });

    if (token.expiresin < new Date()) 
        return res.status(400).json({
            success: false,
            message: "token is expired"
        });
        
    await resetPasswordService.deleteResetPassword({ userId: userId });
    
    let resetPasswordJwtToken = await createJwtToken({
        userId: getTokenData.userId,
        expiresin: addHoursToDate(new Date(), 1)
    }, 60 * 60 * 1000);

    res.status(200).json({
        success: true,
        message: "you can change your password now",
        changePasswordToken: resetPasswordJwtToken
    });
}

exports.update = async (req, res, next) => {
    let { resetPasswordToken } = req.params;
    let { newPassword } = req.body;
    
    if (!resetPasswordToken)
        return res.status(400).json({
            success: false,
            message: "you can't be authorized"
        })
    
    let tokenData = await getDataFromJwtToken(resetPasswordToken);

    let currentDate = new Date();
    if (tokenData.expiresin < currentDate)
        return res.status(400).json({
            success: false,
            message: "reset password token is expired"
        });
    
    let password = await hashing.hash(newPassword);
    
    let updateUser = await authService.updateUser({ id: tokenData.userId }, { password , lastLogin: new Date()});

    if (updateUser === false)
        return res.status(400).json({
            success: false,
            message: "something went wrong on update your password"
        });

    let jwtToken = await createJwtToken({
        userId: tokenData.userId,
        role: "admin"
    }, "3d")

    res.status(200).json({
        success: true,
        message: "password is changed successfully and login sucessfully",
        token: jwtToken
    });
}