import { verifyToken, signTokens } from "../helpers/jwt";
import { setCookies } from "../helpers/cookies";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

const accessSecret = process.env.ACCESS_SECRET || "abcdef";
const refreshSecret = process.env.REFRESH_SECRET || "ghijkl";

// Checks that password's length is 8 or more, contains one uppercase, one lowercase letter, and one digit
export function verifyPassword(password: string) {
	return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z~`! @#$%^&*()_\-+=[\]{}|:;"'<,>.?/]{8,}$/.test(
		password
	);
}

export function authenticate(req: Request, res: Response, next: Function) {
	const accessToken = req.cookies.access;
	let userId;
	try {
		// Check accessToken validity
		const { payload } = verifyToken(accessToken, accessSecret) as JwtPayload;
		if (payload) {
			userId = payload;
		} else {
			throw new Error("Access Token Expired");
		}
	} catch (error) {
		const refreshToken = req.cookies.refresh;
		try {
			// Check refreshToken validity
			const { payload } = verifyToken(refreshToken, refreshSecret) as JwtPayload;
			if (payload) {
				userId = payload;
			} else {
				throw new Error("Refresh Token Expired");
			}
		} catch (error) {
			next(error);
		}
	}
	// If one of the tokens is valid, resign new tokens
	req.uid = userId;
	const newTokens = signTokens(userId);
	setCookies(res, newTokens);
	next();
}
