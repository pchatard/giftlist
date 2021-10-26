import { Response } from 'express';

/**
 * Set tokens to httpOnly cookies
 * @function
 * @param {Response} res - Response object
 * @param {Object} tokens - Object containing the access and refresh tokens
 */
export function setCookies(res: Response, tokens: object) {
    res.cookie('access', tokens.accessToken, {
        httpOnly: true,
    });
    res.cookie('refresh', tokens.refreshToken, {
        httpOnly: true,
    });
}

/**
 * Removes the access and refresh cookies from the response
 * @function
 * @param {Response} res - Response object
 */
export function clearCookies(res: Response) {
    res.clearCookie('access', { httpOnly: true });
    res.clearCookie('refresh', { httpOnly: true });
}
