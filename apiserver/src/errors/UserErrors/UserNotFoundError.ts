import APIError from "../APIError";

class UserNotFoundError extends APIError {
	constructor() {
		super("UserNotFoundError", "User is not found in database.");
	}
}

export default UserNotFoundError;
