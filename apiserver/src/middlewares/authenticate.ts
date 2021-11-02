import { verifyToken, signTokens } from "../helpers/jwt";
import { setCookies } from "../helpers/cookies";
import { Request, Response } from "express";

const accessSecret = process.env.ACCESS_SECRET || "abcdef";
const refreshSecret = process.env.REFRESH_SECRET || "ghijkl";

// Checks that password's length is 8 or more, contains one uppercase, one lowercase letter, and one digit
export function verifyPassword(password: string) {
	return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z~`! @#$%^&*()_\-+=[\]{}|:;"'<,>.?/]{8,}$/.test(
		password
	);
}

function checkToken(token: string, secret: string, errorMessage: string): string {
	let payload: string = "";
	try {
		payload = verifyToken(token, secret) as string;
		if (!payload) {
			throw new Error(errorMessage);
		}
	} catch (err) {

	}
	return payload;
}

export function authenticate(req: Request, res: Response, next: Function) {
	// Check accessToken validity
	checkToken(req.cookies.access, accessSecret, "Access Token Expired");
	// Check refreshToken validity
	const payload  = checkToken(req.cookies.refresh, refreshSecret, "Refresh Token Expired");
	// If one of the tokens is valid, resign new tokens
	req.uid = payload;
	const newTokens = signTokens(payload);
	setCookies(res, newTokens);
	next();
}
