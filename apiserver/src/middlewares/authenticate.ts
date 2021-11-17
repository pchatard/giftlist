import { NextFunction, Request, Response } from "express";
import { decodeToken, getTokenIfDefined } from "../helpers/Token/JWTokenVerifier";
import { signToken } from "../helpers/Token/JWTokenProducer";
import { addUserIdToScope } from "../helpers/Token/UserInScope";
import AuthenticationError from "../helpers/Errors/AuthenticationError";
import jwtConfig from "../config/token";
import { DateTime } from "luxon";

// Checks that password's length is 8 or more, contains one uppercase, one lowercase letter, and one digit
export function verifyPassword(password: string) {
	return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z~`! @#$%^&*()_\-+=[\]{}|:;"'<,>.?/]{8,}$/.test(
		password
	);
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
	try {
		const { uid, exp } = decodeToken(getTokenIfDefined(req, res), res);

		// Add user ID into the scope
		addUserIdToScope(req, uid);

		console.log(exp)
		let expirationDate = DateTime.fromSeconds(exp * 1000)
		if (expirationDate.plus({minutes: 30}).toMillis() < expirationDate.toMillis()) {
			// Update token if expire soon
			const token = signToken(uid);
			res.set(jwtConfig.API_TOKEN_NAME, token);
		}
		next();
	} catch (error) {
		if (error instanceof AuthenticationError) {
			res.sendStatus(403);
		}
	}
}
