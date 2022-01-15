import NotFoundError from "../NotFoundError";

class ListNotFoundError extends NotFoundError {
	constructor() {
		super("List");
	}
}

export default ListNotFoundError;
