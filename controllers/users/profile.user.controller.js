let userservice = require("../../services/users/profile.user._service");

exports.show = async (req, res, next) => {
    let { id } = req.params;
    let profile = await userservice.getProfile({ id });

    if (!profile)
        res.status(404).json({
            success: false,
            message: "can't find this profile"
        })

    res.status(200).json({
        success: true,
        profile
    })
}