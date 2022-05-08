let addressService = require("../../services/users/address.user._service");
let orderService = require("../../services/users/order.user._service");

exports.index = async (req, res, next) => {
    let userId = req.user.id;

    let addresses = await addressService.getUserAddresses({ userId });

    res.status(200).json({
        success: true,
        addresses
    });
}
exports.show = async (req, res, next) => {
    let { id } = req.params;
    let userAddress = await addressService.getAddress({ id });

    if (userAddress) 
        return res.status(200).json({
            success: true,
            address: userAddress
        });
     
    res.status(404).json({
        success: false,
        message: "user address is not found"
    });
}

exports.store = async (req, res, next) => {
    let userId = req.user.id;
    let { governorateId, cityId, firstZone, secondZone } = req.body;

    await addressService.createAddress({
        userId,
        governorateId,
        cityId,
        firstZone,
        secondZone
    });

    res.status(201).json({
        success: true,
        message: "address is created successfully"
    });
}

exports.update = async (req, res, next) => {
    let { id } = req.params;
    let { firstZone, secondZone } = req.body;

    let updateAddress = await addressService.updateAddress({ id }, {
        firstZone,
        secondZone
    });

    if (updateAddress === true)
        return res.status(200).json({
            success: true,
            message: "address is updated successfully"
        });
     
    res.status(400).json({
        success: false,
        message: "user address is not found to update"
    });
}

