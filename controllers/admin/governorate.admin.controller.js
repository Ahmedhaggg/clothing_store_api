let governorateService = require("../../services/admin/governorate.admin._service");
 
exports.index = async (req, res, next) => {
    let governorates = await governorateService.getAllGovernorates();

    res.status(200).json({
        success: true,
        governorates
    })
}
exports.store = async (req, res, next) => {
    let { name } = req.body;

    let governorate = await governorateService.createGovernorate({ name });

    res.status(201).json({
        success: true,
        message: "governorate is created successfully",
        governorate
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

