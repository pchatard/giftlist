export default class AuthenticationError extends Error {
	constructor() {
		super();
		this.message = "Unauthorized : you must be authenticated!";
		this.name = "AuthenticationError";
	}
}
