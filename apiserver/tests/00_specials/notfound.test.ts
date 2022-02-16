import "mocha";

import { Url_NotFound } from "../global";
import { del, get, post, put } from "../helpers/crud";
import { expectError } from "../helpers/error";

export default function suite() {
	it("Returns 404 Not Found", async () => {
		const responses = [
			await del(Url_NotFound() + "/"),
			await get(Url_NotFound() + "/"),
			await post(Url_NotFound() + "/"),
			await put(Url_NotFound() + "/"),
		];
		responses.forEach((response) => expectError(response, 404, "Not Found"));
	});
}
