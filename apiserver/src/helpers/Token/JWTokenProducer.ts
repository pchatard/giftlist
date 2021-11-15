import { sign } from "jsonwebtoken";
import jwtConfig from "../../config/token";

export function signToken(uid: any): string {
	return sign({ uid }, jwtConfig.CRYPTO_SECRET, {
		algorithm: "HS512",
		expiresIn: 604800, // 1 week
	});
}
