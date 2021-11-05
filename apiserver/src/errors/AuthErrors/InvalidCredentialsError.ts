import APIError from "../APIError";

class InvalidCredentialsError extends APIError {
	constructor() {
		super("InvalidCredentialsError", "E-mail ou mot de passe incorrects");
	}
}

export default InvalidCredentialsError;
