let shipperService = require("../../services/admin/shipper.admin._service");

exports.index = async (req, res, next) => {
    let status = req.query.status || "available";

    let shippers = await shipperService.getAllShipper({ status });

    res.status(200).json({
        shippers
    });
}

exports.store = async (req, res, next) => {
    let { name } = req.body;

    await shipperService.createShipper({ name, status: "available" });

    res.status(200).json({
        success: true,
        message: "shipper is created successfully"
    });
}

exports.show = async (req, res, next) => {
    let { id } = req.params;

    let shipper = await shipperService.getShipper({ id });

    if (!shipper) 
        return res.status(404).json({
            success: false,
            message: "Shipper is not found"
        });

    return res.status(200).json({
        success: true,
        shipper
    });
}
