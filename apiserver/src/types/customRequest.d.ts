import { Auth } from "firebase/auth";
import { Database } from "@firebase/database";

declare global {
	namespace Express {
		interface Request {
			database: Database;
			auth: Auth;
			uid?: string;
		}
	}
}
