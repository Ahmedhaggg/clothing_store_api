let { getDataFromJwtToken } = require("../helpers/jwtToken");
exports.isAdmin = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        let tokenData = await getDataFromJwtToken(token);

        if (tokenData.role !== "admin") {
            await fs.unlinkSync(path.join(req.file.destination,  req.file.filename));

            return res.status(500).json({
                success: false,
                message: "invaild token"
            });
        }

        next();
    } catch (error) {
        if (req.file)
            await fs.unlinkSync(path.join(req.file.destination,  req.file.filename));

        res.status(500).json({
            success: false,
            message: "something went wrong"
        });
    }
}

exports.isUser = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        
        let tokenData = await getDataFromJwtToken(token);
        
        if (tokenData.role !== "user")
            return res.status(404).json({
                success: false,
                message: "invaild token"
            });
        
        req.user = {
            id: tokenData.userId
        }
        next();
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: "something went wrong"
        });
    }
}