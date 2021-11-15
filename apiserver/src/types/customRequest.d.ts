import { Auth } from "firebase/auth";
import { Database } from "@firebase/database";
import { Request } from "express";

declare global {
	namespace Express {
		interface Request {
			database: Database;
			authent: Auth;
			uid?: string;
		}
	}
}
