const { verifyToken, signTokens } = require('../helpers/jwt');
const { setCookies } = require('../helpers/cookies');
const accessSecret = process.env.ACCESS_SECRET || 'abcdef';
const refreshSecret = process.env.REFRESH_SECRET || 'ghijkl';

// Checks that password's length is 8 or more, contains one uppercase, one lowercase letter, and one digit
const verifyPassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
};

const authenticate = (req, res, next) => {
    const accessToken = req.cookies.access;
    let userId;
    try {
        // Check accessToken validity
        const { payload } = verifyToken(accessToken, accessSecret);
        if (payload) {
            userId = payload;
        } else {
            throw new Error('no payload');
        }
    } catch (error) {
        const refreshToken = JSON.stringify(req.cookies.refresh);
        try {
            // Check refreshToken validity
            const { payload } = verifyToken(refreshToken, refreshSecret);
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

module.exports = { verifyPassword, authenticate };
