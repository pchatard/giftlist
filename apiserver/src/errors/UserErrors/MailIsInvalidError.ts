import APIError from "../APIError";

class MailIsInvalidError extends APIError {
	constructor() {
		super("MailIsInvalidError", "Mail is not consider valid.");
	}
}

export default MailIsInvalidError;
