let authService = require("../../services/users/auth.user._service");
let sendEmail = require("../../helpers/sendEmail")
let { addHoursToDate } = require("../../helpers/date.handler");
let genrateRandomDigitCode = require("../../helpers/generateRandomDigitCode");
let hashing = require("../../helpers/hash");
let { createJwtToken } = require("../../helpers/jwtToken")

exports.register = async (req, res, next) => {
    let { firstName, lastName, userName, email, password, gender, birthday, phoneNumber } = req.body;
    
    let verificationCode = genrateRandomDigitCode();
    let hashedPassword = await hashing.hash(password)
    
    await authService.createUser({
        firstName,
        lastName, 
        userName,
        email,
        password: hashedPassword,
        gender,
        birthday,
        phoneNumber
    }, {
        code: verificationCode,
        expiresin: addHoursToDate(new Date(), 2)
    });
    
    await sendEmail({
        to: email,
        subject: "please confirm your email",
        html: `
            <p>email verification code is : ${verificationCode}</p>
        `
    });

    res.status(201).json({
        success: true,
        message: "verify your email"
    })
}

exports.verify = async (req, res, next) => {
    let { code } = req.body;
    let { email } = req.params;

    let user = await authService.getUserIdAndEmailVerificationCode({ email })
    
    if (code !== user.code)
        return res.status(400).json({
            success: false,
            message: "this is incorrect code"
        });

    await authService.updateUser({ id: userId }, {
        verified: true,
        verifiedAt: new Date()
    });

    await authService.deleteEmailVerification({ userId });

    res.status(200).json({
        success: true, 
        message: "email is verified successfully"
    });
}

exports.login = async (req, res, next) => {
    let { email, password } = req.body;

    let user = authService.getUser({ email });

    if (user.verified === false) {

        let newVerificationCode = genrateRandomDigitCode();
        let expiresin = addHoursToDate(new Date(2), 2)

        await authService.updateEmailVerification({userId : user.id }, {
            code: newVerificationCode,
            expiresin
        });

        await sendEmail({
            to: email,
            subject: "please confirm your email",
            html: `
                <p>email verification code is : ${newVerificationCode}</p>
            `
        });

        return res.status(400).json({
            success: false,
            message: "first you should verify your email, we send code of verification in your email"
        })
    }

    let checkIsPassword = await hashing.compare(password, user.password);

    if (checkIsPassword == false)
        return res.status(200).json({
            success: false,
            message: "password is incorrect"
        });

    await authService.updateUser({ email }, { lastLogin: new Date() })
    
    let token = await createJwtToken({
        userId: user.id,
        role: "user"
    });

    res.status(200).json({
        success: true,
        message: "success login",
        token
    })
}