import APIError from "../APIError";

class SharedListAccessError extends APIError {
	constructor() {
		super("SharedListAccessError", "Vous ne pouvez pas accéder à votre propre liste partagée");
	}
}

export default SharedListAccessError;
