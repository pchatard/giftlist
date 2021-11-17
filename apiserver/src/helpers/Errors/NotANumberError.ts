export default class NotANumberError extends Error {
	constructor() {
		super();
		this.message = "Given input is not a number";
		this.name = "NotANumberError";
	}
}
