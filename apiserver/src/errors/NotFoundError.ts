import APIError from "./APIError";

class NotFoundError extends APIError {
	constructor(model: string) {
		super(`${model}NotFoundError`, `${model} is not found in database.`);
	}
}

export default NotFoundError;
