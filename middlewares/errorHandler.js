const errorHandler = async (err, req, res, next) => {

    console.log(err);
    res.status(500).json({
        success: false,
        error: "something went wrong"
    });
}

module.exports = errorHandler;