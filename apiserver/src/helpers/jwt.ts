import jwt, { JwtPayload } from 'jsonwebtoken';

const accessSecret = process.env.ACCESS_SECRET || 'abcdef';
const refreshSecret = process.env.REFRESH_SECRET || 'ghijkl';
const publicSecret = process.env.PUBLIC_SECRET || 'mnopqr';

/**
 * Decodes a token
 * @function
 * @param {String} token - Token to be verified
 * @param {*} secret - Secret key used to sign the token
 * @returns {string | JwtPayload} The decoded payload of the token
 */
export function verifyToken(token: string, secret: any): string | JwtPayload {
    return jwt.verify(token, secret);
}

/**
 * Sign access, refresh and public tokens containing the userId
 * @function
 * @param {String} userId - The userId to be signed in the tokens
 * @returns {Object} Object containing 3 tokens
 */
export function signTokens(userId: string): object {
    const accessToken = signAccessToken(userId);
    const refreshToken = signRefreshToken(userId);
    const publicToken = signPublicToken();
    return { accessToken, refreshToken, publicToken };
}

/**
 * Signs the access token
 * @function
 * @param {String} payload - The payload to be contained in the token
 * @param {number} exp - The validity of the token
 * @returns {String} Token
 */
function signAccessToken(payload: string, exp: number = 60): string {
    return jwt.sign({ payload }, accessSecret, { expiresIn: exp });
}

/**
 * Signs the refresh token
 * @function
 * @param {String} payload - The payload to be contained in the token
 * @param {String} exp - The validity of the token
 * @returns {String} Token
 */
function signRefreshToken(payload: string, exp: string = '7d'): string {
    return jwt.sign({ payload }, refreshSecret, { expiresIn: exp });
}

/**
 * Signs the public token
 * @function
 * @param {String} payload - The payload to be contained in the token
 * @param {String} exp - The validity of the token
 * @returns {String} Token
 */
function signPublicToken(): string {
    return jwt.sign({}, publicSecret);
}
