const jwt = require('jsonwebtoken');
const accessSecret = process.env.ACCESS_SECRET || 'abcdef';
const refreshSecret = process.env.REFRESH_SECRET || 'ghijkl';
const publicSecret = process.env.PUBLIC_SECRET || 'mnopqr';

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
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

module.exports = {
    verifyToken,
    signTokens,
};
