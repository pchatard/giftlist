import APIError from "./APIError";

class ResourceNotFoundError extends APIError {
	constructor() {
		super("ResourceNotFoundError", "Resource not found");
	}
}

export default ResourceNotFoundError;
