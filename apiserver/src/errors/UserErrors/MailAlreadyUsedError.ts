import APIError from "./../APIError";

class MailAlreadyUsedError extends APIError {
	constructor() {
		super("MailAlreadyUsedError", "Mail already used.");
	}
}

export default MailAlreadyUsedError;
