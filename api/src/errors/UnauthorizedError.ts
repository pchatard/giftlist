import APIError from "./APIError";

class UnauthorizedError extends APIError {
	constructor() {
		super("UnauthorizedError", "User unauthorized.");
	}
}

export interface UnauthorizedErrorJSON {
	message: "Unauthorized";
}

export default UnauthorizedError;
