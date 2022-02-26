let { hash, compare } = require("../../helpers/hash");
let authAdminService = require("../../services/admin/auth.admin._service");
let { createJwtToken } = require("../../helpers/jwtToken");
exports.login = async (req, res, next) => {
    let { email, password } = req.body;

    let admin = await authAdminService.getAdmin(email);
    console.log(admin.id)
    if (!admin) 
        return res.status(400).json({
            success: false,
            message: "email or password is incorrect"
        })

    let checkPassword = await compare(password, admin.password);
    
    if (checkPassword === false)
        return res.status(400).message({
            success: false,
            message: "email or password is incorrect"
        })
        
    let token = await createJwtToken({
        isAdmin: true,
        adminId: admin.id
    }, "7d");

    res.status(200).json({
       success: true,
       token 
    });
}

exports.register = async (req, res, next) => {
    let { email, password } = req.body;
    password =  await hash(password);
    let newU =  await authAdminService.createAdmin({email, password});
    console.log(newU);
    res.status(200).json({
        success: true,
        message: "admin created successfully"
    })
}
