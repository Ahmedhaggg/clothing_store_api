let addressService = require("../../services/users/address.user._service");

exports.index = async (req, res, next) => {
    let { userId } = req.params;
    let addresses = await addressService.getUserAddresses({ userId });

    if (addresses.length === 0)
        res.status(404).json({
            success: false,
            message: "user doesn't has any address"
        });
    else 
        res.status(200).json({
            success: true,
            addresses
        })

}

exports.store = async (req, res, next) => {
    let { userId } = req.user;
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