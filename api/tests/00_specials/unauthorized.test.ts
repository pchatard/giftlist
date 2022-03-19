import "mocha";

import chai from "chai";

import server from "../../src/index";
import {
	Url_DeleteUnauthorized,
	Url_GetUnauthorized,
	Url_PostUnauthorized,
	Url_PutUnauthorized,
} from "../global";
import { expectError } from "../helpers/error";

export default function suite() {
	it("Returns 401 Unauthorized", async () => {
		const responses = [
			await chai.request(server).post(Url_PostUnauthorized()),
			await chai.request(server).get(Url_GetUnauthorized()),
			await chai.request(server).put(Url_PutUnauthorized()),
			await chai.request(server).delete(Url_DeleteUnauthorized()),
		];
		responses.forEach((response) => expectError(response, 401, "Unauthorized"));
	});
}
