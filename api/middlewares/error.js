const errorHandler = (err, req, res, next) => {
    res.status(200).send({
        err: {
            name: err.name,
            message: err.message,
        },
    });
};

module.exports = errorHandler;
