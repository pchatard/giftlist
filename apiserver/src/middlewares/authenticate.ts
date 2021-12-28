// Auth.ts
import { Request } from "express";
import jwt from "jsonwebtoken";
import jwksRsa, { SigningKey } from "jwks-rsa";

export function expressAuthentication(
	request: Request,
	securityName: string,
	_scopes?: string[]
): Promise<void> {
	if (securityName === "auth0") {
		const token = request.headers["authorization"];

		return new Promise((resolve, reject) => {
			if (!token) {
				reject(new Error("No token provided"));
			} else {
				var client = jwksRsa({
					cache: true,
					rateLimit: true,
					jwksRequestsPerMinute: 5,
					jwksUri: process.env.AUTH0_JWKS_URI || "",
				});

				function getKey(header: any, callback: any) {
					client.getSigningKey(header.kid, (_err: Error | null, key: SigningKey) =>
						callback(null, key.getPublicKey())
					);
				}

				jwt.verify(token.split("Bearer ")[1], getKey, function (err: any, decoded: any) {
					if (err) {
						reject(err);
					} else {
						if (decoded.aud != process.env.AUTH0_AUDIENCE) {
							reject(new Error("JWT error"));
						}
						if (decoded.iss != process.env.AUTH0_ISSUER) {
							reject(new Error("JWT error"));
						}
						resolve(decoded);
					}
				});
			}
		});
	}
	throw Error("Unsupported Authentication mode");
}
