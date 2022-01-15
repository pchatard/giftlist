import APIError from "../APIError";

class OwnershipError extends APIError {
	constructor() {
		super("OwnershipError", "User unauthorized.");
	}
}

export default OwnershipError;
