import APIError from "../APIError";

class UserAlreadyExistsError extends APIError {
	constructor() {
		super("UserAlreadyExistsError", "Cet e-mail est déjà utilisé");
	}
}

export default UserAlreadyExistsError;
