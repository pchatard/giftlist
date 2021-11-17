import { verify, JsonWebTokenError, TokenExpiredError, VerifyErrors } from "jsonwebtoken";
import { Request, Response } from "express";

import JWToken from "../../types/JWToken";
import jwtConfig from "../../config/token";

export function getTokenIfDefined(req: Request, res: Response): string {
	if (typeof req.headers.authorization !== "undefined") {
		const token = req.headers.authorization.split(" ")[1];
		if (token) {
			return token;
		}
	}
	res.status(403).json({ error: "Not Authorized" });
	throw new Error("Not Authorized");
}

export function decodeToken(token: string, res: Response): JWToken {
	let decodedToken;
	verify(
		token,
		jwtConfig.CRYPTO_SECRET,
		{ algorithms: ["HS512"] },
		function (err: VerifyErrors | null, decoded: object | undefined) {
			if (err) {
				if (err instanceof TokenExpiredError) {
					res.statusCode = 401;
					throw err;
				}
				throw new JsonWebTokenError("Wrong secret");
			} else {
				decodedToken = decoded;
			}
		}
	);
	if (decodedToken !== undefined) {
		return decodedToken;
	} else {
		throw new JsonWebTokenError("Something went wrong with JWT.");
	}
}
