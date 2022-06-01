let userService = require("../../services/admin/user.admin._service")

exports.index = async (req, res, next) => {
    let verified  = req.query.verified ? true : false;
    let users = await userService.getUsers({ verified });
    res.status(200).json({
        success: true,
        users
    });
}

exports.show = async (req, res, next) => {
    let { id } = req.params;
    let user = await userService.getUser({ id });

    if (!user)
        return res.status(404).json({
            success: true,
            message: "user is not found"
        });

    
    res.status(200).json({
        success: true,
        user
    });
}

exports.destroy = async (req, res, next) => {
    let { id } = req.params;
    let deleteUser = userService.deleteUser({ id });

    if (deleteUser === false) 
        return res.status(400).json({
            success: false,
            message: "user is not found to delete"
        });
        
    res.status(200).json({
        success: true,
        message: "user is deleted successfully"
    });
}