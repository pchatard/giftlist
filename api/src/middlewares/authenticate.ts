/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "dotenv";
import { Request } from "express";
import { UnauthorizedError } from "express-jwt";
import jwt from "jsonwebtoken";
import jwksRsa, { SigningKey } from "jwks-rsa";

config({ path: process.env.NODE_ENV == "dev" ? ".env.local" : ".env.test" });

export function expressAuthentication(
	request: Request,
	securityName: string,
	_scopes?: string[]
): Promise<void> {
	if (securityName === "auth0") {
		const token = request.headers["authorization"] || "";

		return new Promise((resolve, reject) => {
			const client = jwksRsa({
				cache: true,
				rateLimit: true,
				jwksRequestsPerMinute: 5,
				jwksUri: process.env.AUTH0_JWKS_URI || "",
			});

			function getKey(header: any, callback: any) {
				client.getSigningKey(header.kid, (_err: Error | null, key: SigningKey | undefined) =>
					callback(null, key?.getPublicKey())
				);
			}

			jwt.verify(token.split("Bearer ")[1], getKey, function (err: unknown, decoded: any) {
				if (err) {
					reject(err);
				} else {
					if (
						!decoded.aud.includes(process.env.AUTH0_AUDIENCE) ||
						decoded.iss != process.env.AUTH0_ISSUER
					) {
						reject(new UnauthorizedError("invalid_token", { message: "Invalid Token" }));
					}
					// If authenticated, pass the userID into request
					request.userId = decoded.sub;
					resolve(decoded);
				}
			});
		});
	}
	throw Error("Unsupported Authentication mode");
}
