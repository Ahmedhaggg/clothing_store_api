let cityService = require("../../services/admin/city.admin._service");
 
exports.index = async (req, res, next) => {
    let cities = await cityService.getAllCities();

    res.status(200).json({
        success: true,
        cities
    });
}

exports.show = async (req, res, next) => {
    let { id } = req.params;
    let city = await cityService.getCity({ id });

    if (city) 
        return res.status(200).json({
            success: true,
            city
        });
     
    res.status(400).json({
        success: false,
        message: "city is not found"
    });
}

exports.store = async (req, res, next) => {
    let { governorateId, name, shippingTime, shippingCost } = req.body;

    let city = await cityService.createCity({
        governorateId,
        name,
        shippingTime,
        shippingCost
    });

    res.status(201).json({
        success: true,
        message: "city is created successfully",
        city
    });
}

exports.update = async (req, res, next) => {
    let { id } = req.params;
    let { shippingTime, shippingCost } = req.body;

    let updateCity = await cityService.updateCity({ id }, { shippingTime, shippingCost });

    if (updateCity === true)
        return res.status(201).json({
            success: true,
            message: "city is updated successfully"
        });

    res.status(400).json({
        success: false,
        message: "city is not found to update"
    });
}