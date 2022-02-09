import "mocha";
import { expectError } from "./../helpers/error";
import { del, get, post, put } from "./../helpers/crud";
import { Url_NotFound } from "./../global";

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
