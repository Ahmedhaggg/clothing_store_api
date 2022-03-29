let governorateService = require("../../services/admin/governorate.admin._service");

exports.index = async (req, res, next) => {
    let governorates = await governorateService.getAllGpvernorate();

    res.status(200).json({
        success: true,
        governorates
    })
}
exports.store = async (req, res, next) => {
    let { name } = req.body;

    await governorateService.createGovernorate({ name });

    res.status(201).json({
        success: true,
        message: "new governorate created"
    });
}

exports.show = async (req, res, next) => {
    let { id } = req.params;

    let governorate = await governorateService.getGovernorate({ id });

    if (governorate)
        res.status(200).json({
            success: true,
            governorate
        });
    else 
        res.status(404).json({
            success: true,
            message: "governorate is not found"
        });

}

