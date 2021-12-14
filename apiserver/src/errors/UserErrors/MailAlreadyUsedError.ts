import APIError from "../APIError";

class ListNameAlreadyUsedError extends APIError {
	constructor() {
		super("MailAlreadyUsedError", "Mail already used.");
	}
}

export default ListNameAlreadyUsedError;
