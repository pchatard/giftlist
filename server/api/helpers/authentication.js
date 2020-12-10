const jwt = require('jsonwebtoken');
const accessSecret = process.env.ACCESS_SECRET || 'abcdef';
const refreshSecret = process.env.REFRESH_SECRET || 'ghijkl';
const publicSecret = process.env.PUBLIC_SECRET || 'mnopqr';

const authenticateUser = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    try {
        // Check accessToken validity
        const { payload } = jwt.verify(accessToken, accessSecret);
        req.userId = payload;
    } catch (error) {
        const refreshToken = req.cookies.refreshToken;
        try {
            // Check refreshToken validity
            const { payload } = jwt.verify(refreshToken, refreshSecret);
            req.userId = payload;
        } catch (error) {
            next(error);
        }
    }
    // If one of the tokens is valid, resign new tokens
    const newTokens = signTokens(req.userId);
    setCookies(res, newTokens);
    next();
};

const signTokens = (id) => {
    const accessToken = signAccessToken(id);
    const refreshToken = signRefreshToken(id);
    const publicToken = signPublicToken(id);
    return { accessToken, refreshToken, publicToken };
};

const signAccessToken = (payload, exp = 60) => {
    return jwt.sign({ payload }, accessSecret, { expiresIn: exp });
};

const signRefreshToken = (payload, exp = '7d') => {
    return jwt.sign({ payload }, refreshSecret, { expiresIn: exp });
};

const signPublicToken = (payload) => {
    return jwt.sign({ payload }, publicSecret);
};

// Checks that password's length is 8 or more, contains one uppercase, one lowercase letter, and one digit
const verifyPassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
};

const setCookies = (res, tokens) => {
    res.cookie('accessToken', tokens.accessToken, { httpOnly: true });
    res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
    });
};

module.exports = {
    authenticateUser,
    signTokens,
    verifyPassword,
    setCookies,
};
