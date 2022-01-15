import NotFoundError from "../NotFoundError";

class UserNotFoundError extends NotFoundError {
	constructor() {
		super("User");
	}
}

export default UserNotFoundError;
