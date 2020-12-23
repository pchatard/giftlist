/**
 * Set tokens to httpOnly cookies
 * @function
 * @param {Response} res - Response object
 * @param {Object} tokens - Object containing the access and refresh tokens
 */
const setCookies = (res, tokens) => {
    res.cookie('access', tokens.accessToken, {
        httpOnly: true,
    });
    res.cookie('refresh', tokens.refreshToken, {
        httpOnly: true,
    });
};

/**
 * Removes the access and refresh cookies from the response
 * @function
 * @param {Response} res - Response object
 */
const clearCookies = (res) => {
    res.clearCookie('access', { httpOnly: true });
    res.clearCookie('refresh', { httpOnly: true });
};

module.exports = { setCookies, clearCookies };
