import APIError from "./APIError";

class NotUUIDError extends APIError {
	constructor(str: string) {
		super("NotUUIDError", "String " + str + " is not a well-formated UUID.");
	}
}

export default NotUUIDError;
