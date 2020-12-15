const setCookies = (res, tokens) => {
    res.cookie('access', tokens.accessToken, {
        httpOnly: true,
    });
    res.cookie('refresh', tokens.refreshToken, {
        httpOnly: true,
    });
};

const clearCookies = (res) => {
    res.clearCookie('access', { httpOnly: true });
    res.clearCookie('refresh', { httpOnly: true });
};

module.exports = { setCookies, clearCookies };
