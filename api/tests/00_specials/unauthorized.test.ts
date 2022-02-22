import "mocha";

import chai from "chai";
import { v4 } from "uuid";

import server from "../../src/index";
import { Url_Unauthorized } from "../global";
import { expectError } from "../helpers/error";

export default function suite() {
	it("Returns 401 Unauthorized", async () => {
		const responses = [
			await chai.request(server).post(Url_Unauthorized() + "/"),
			await chai.request(server).get(Url_Unauthorized() + "/"),
			await chai.request(server).put(Url_Unauthorized() + "/" + v4()),
			await chai.request(server).delete(Url_Unauthorized() + "/" + v4()),
		];
		responses.forEach((response) => expectError(response, 401, "Unauthorized"));
	});
}
