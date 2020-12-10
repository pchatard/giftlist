const errorHandler = (err, req, res, next) => {
    // const customErr = { code: 404, message: 'prout' };
    res.send({ code: err.code, msg: err.message });
};

module.exports = errorHandler;
