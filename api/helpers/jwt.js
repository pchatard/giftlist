const jwt = require('jsonwebtoken');
const accessSecret = process.env.ACCESS_SECRET || 'abcdef';
const refreshSecret = process.env.REFRESH_SECRET || 'ghijkl';
const publicSecret = process.env.PUBLIC_SECRET || 'mnopqr';

/**
 * Decodes a token
 * @function
 * @param {String} token - Token to be verified
 * @param {*} secret - Secret key used to sign the token
 * @returns {Object} The decoded payload of the token
 */
const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};

/**
 * Sign access, refresh and public tokens containing the userId
 * @function
 * @param {String} userId - The userId to be signed in the tokens
 * @returns {Object} Object containing 3 tokens
 */
const signTokens = (userId) => {
    const accessToken = signAccessToken(userId);
    const refreshToken = signRefreshToken(userId);
    const publicToken = signPublicToken();
    return { accessToken, refreshToken, publicToken };
};

/**
 * Signs the access token
 * @function
 * @param {String} payload - The payload to be contained in the token
 * @param {String} exp - The validity of the token
 * @returns {String} Token
 */
const signAccessToken = (payload, exp = 60) => {
    return jwt.sign({ payload }, accessSecret, { expiresIn: exp });
};

/**
 * Signs the refresh token
 * @function
 * @param {String} payload - The payload to be contained in the token
 * @param {String} exp - The validity of the token
 * @returns {String} Token
 */
const signRefreshToken = (payload, exp = '7d') => {
    return jwt.sign({ payload }, refreshSecret, { expiresIn: exp });
};

/**
 * Signs the public token
 * @function
 * @param {String} payload - The payload to be contained in the token
 * @param {String} exp - The validity of the token
 * @returns {String} Token
 */
const signPublicToken = () => {
    return jwt.sign({}, publicSecret);
};

module.exports = {
    verifyToken,
    signTokens,
};
