const errorHandler = (err, req, res, next) => {
    // const customErr = { code: 404, message: 'prout' };
    res.status(404).send({ error: err.message });
};

module.exports = errorHandler;
