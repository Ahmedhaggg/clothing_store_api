const errorHandler = (err, req, res, next) => {
    let status = err.status || 500;
    let error = err.message || "something went wrong";

    res.status(status).json({
        success: false,
        error
    });
}

module.exports = errorHandler;