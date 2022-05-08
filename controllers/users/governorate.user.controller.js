let governorateService = require("../../services/users/governorate.user._service");

exports.index = async (req, res, next) => {
    let governorates = await governorateService.getAllGovernorates();

    res.status(200).json({
        success: true,
        governorates
    });
}

exports.show = async (req, res, next) => {
    let { id } = req.params;

    let governorate = await governorateService.getGovernorate({ id });

    if (governorate)
        return res.status(200).json({
            success: true,
            governorate
        });
     
    res.status(404).json({
        success: true,
        message: "governorate is not found"
    });

}