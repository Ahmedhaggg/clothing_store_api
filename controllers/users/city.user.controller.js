let cityService = require("../../services/users/city.user._service");

exports.show = async (req, res, next) => {
    let { id } = req.params;

    let city = await cityService.getCity({ id });

    if (!city)
        return res.status(404).json({
            success: false,
            message: "city is not found"
        });

    res.status(200).json({
        success: true,
        city
    });
}