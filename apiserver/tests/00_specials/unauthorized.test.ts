import "mocha";
import { BaseUrl_Unauthorized } from "../global";
import { expectError } from "../helpers/errors";
import { del, get, post, put } from "../helpers/crud";

export default function suite() {
	it("Returns 401 Unauthorized", async () => {
		const responses = [
			await del(BaseUrl_Unauthorized + "/"),
			await get(BaseUrl_Unauthorized + "/"),
			await post(BaseUrl_Unauthorized + "/"),
			await put(BaseUrl_Unauthorized + "/"),
		];
		responses.forEach((response) => expectError(response, 401, "Unauthorized"));
	});
}
