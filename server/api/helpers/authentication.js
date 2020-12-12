const jwt = require('jsonwebtoken');
const accessSecret = process.env.ACCESS_SECRET || 'abcdef';
const refreshSecret = process.env.REFRESH_SECRET || 'ghijkl';
const publicSecret = process.env.PUBLIC_SECRET || 'mnopqr';

const authenticateUser = (req, res, next) => {
    const accessToken = req.cookies.access;
    let userId;
    try {
        // Check accessToken validity
        const { payload } = jwt.verify(accessToken, accessSecret);
        if (payload) {
            userId = payload;
        } else {
            throw new Error('no payload');
        }
    } catch (error) {
        const refreshToken = JSON.stringify(req.cookies.refresh);
        try {
            // Check refreshToken validity
            const { payload } = jwt.verify(refreshToken, refreshSecret);
            if (payload) {
                userId = payload;
            } else {
                throw new Error('no payload');
            }
        } catch (error) {
            next(error);
        }
    }
    // If one of the tokens is valid, resign new tokens
    req.userId = userId;
    const newTokens = signTokens(userId);
    setCookies(res, newTokens);
    next();
};

const signTokens = (userId) => {
    const accessToken = signAccessToken(userId);
    const refreshToken = signRefreshToken(userId);
    const publicToken = signPublicToken();
    return { accessToken, refreshToken, publicToken };
};

const signAccessToken = (payload, exp = 60) => {
    return jwt.sign({ payload }, accessSecret, { expiresIn: exp });
};

const signRefreshToken = (payload, exp = '7d') => {
    return jwt.sign({ payload }, refreshSecret, { expiresIn: exp });
};

const signPublicToken = () => {
    return jwt.sign({}, publicSecret);
};

// Checks that password's length is 8 or more, contains one uppercase, one lowercase letter, and one digit
const verifyPassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
};

const setCookies = (res, tokens) => {
    res.cookie('access', tokens.accessToken, {
        httpOnly: true,
    });
    res.cookie('refresh', tokens.refreshToken, {
        httpOnly: true,
    });
};

module.exports = {
    authenticateUser,
    signTokens,
    verifyPassword,
    setCookies,
};
