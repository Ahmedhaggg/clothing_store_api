let cityService = require("../../services/admin/city.admin._service");
 
exports.show = async (req, res, next) => {
    let { id } = req.params;
    let city = await cityService.getCity({ id });

    if (city) 
        res.status(200).json({
            success: true,
            city
        })
    else 
        res.status(400).json({
            success: false,
            message: "city is not found"
        })
}

exports.store = async (req, res, next) => {
    let { governorateId, name, shippingTime, shippingCost } = req.body;

    await cityService.createCity({
        governorateId,
        name,
        shippingTime,
        shippingCost
    });

    return res.status(201).json({
        success: true,
        message: "new city created"
    });
}

exports.update = async (req, res, next) => {
    let { id } = req.params;
    let { shippingTime, shippingCost } = req.body;

    let updateCity = await cityService.updateCity({ id },{
        shippingTime,
        shippingCost
    });

    if (updateCity === true)
        res.status(201).json({
            success: true,
            message: "new city created"
        });
    else 
        res.status(400).json({
            success: false,
            message: "faild to update city"
        })
}