import "mocha";
import { BaseUrl_NotFound } from "../global";
import { expectError } from "../helpers/errors";
import { del, get, post, put } from "../helpers/crud";

export default function suite() {
	it("Returns 404 Not Found", async () => {
		const responses = [
			await del(BaseUrl_NotFound + "/"),
			await get(BaseUrl_NotFound + "/"),
			await post(BaseUrl_NotFound + "/"),
			await put(BaseUrl_NotFound + "/"),
		];
		responses.forEach((response) => expectError(response, 404, "Not Found"));
	});
}
