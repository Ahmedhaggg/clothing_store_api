let addressService = require("../../services/users/address.user._service");
let orderService = require("../../services/users/order.user._service");

exports.index = async (req, res, next) => {
    let { userId } = req.user;

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
exports.show = async (req, res, next) => {
    let { id } = req.params;
    let userAddress = await addressService.getAddress({ id });

    if (userAddress) 
        res.status(200).json({
            success: true,
            address: userAddress
        })
    else 
        res.status(404).json({
            success: false,
            message: "user address is not found"
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

exports.update = async (req, res, next) => {
    let { id } = req.params;
    let { firstZone, secondZone } = req.body;

    let updateAddress = await addressService.update({ id }, {
        firstZone,
        secondZone
    });

    if (updateAddress === true)
        res.status(200).json({
            success: true,
            message: "address is updated successfully"
        });
    else 
        res.status(400).json({
            success: false,
            message: "check your new data"
        })

}

// exports.delete = async (req, res, next) => {
//     let { id } = req.params;

//     let checkOrdersWithAddress = await addressService.checkOrderWithAddress({ addessId: id });

//     if (checkOrdersWithAddress === true)
//         return res.status(400).json({
//             success: false,
//             message: "can't update this address now because is shipping"
//         })

//     await addressService.deleteAddress({ id });

//     res.status(200).json({
//         success: true,
//         message: "address is deleted successfully"
//     });
// }