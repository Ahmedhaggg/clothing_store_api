let { getDataFromJwtToken } = require("../helpers/jwtToken");
exports.isAdmin = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        let tokenData = await getDataFromJwtToken(token);

        if (tokenData.role !== "admin")
            return res.status(500).json({
                success: false,
                message: "invaild token"
            })

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "something went wrong"
        });
    }
}

exports.isUser = async (req, res, next) => {
    try {
        let token = req.headers['Authorization'];
        let tokenData = await getDataFromJwtToken(token);

        if (tokenData.role !== "user")
            return res.status(404).json({
                success: false,
                message: "invaild token"
            })
        req.user = {
            userId: tokenData.userId
        }
        next();
    } catch (_) {
        res.status(500).json({
            success: false,
            message: "something went wrong"
        });
    }
}