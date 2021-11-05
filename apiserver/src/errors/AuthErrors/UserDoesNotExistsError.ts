import APIError from "../APIError";

class UserDoesNotExistsError extends APIError {
	constructor() {
		super("UserDoesNotExistsError", "L'utilisateur demandé n'existe pas");
	}
}

export default UserDoesNotExistsError;
