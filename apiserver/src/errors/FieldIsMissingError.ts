import APIError from "./APIError";

class FieldIsMissingError extends APIError {
	constructor(fieldName: string) {
		super("FieldIsMissingError", "Required field " + fieldName + " is missing.");
	}
}

export default FieldIsMissingError;
