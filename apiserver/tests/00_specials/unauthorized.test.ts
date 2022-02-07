import "mocha";
import chai from "chai";
import { v4 } from "uuid";
import server from "../../src/index";
import { BaseUrl_Users } from "./../global";
import { expectError } from "../helpers/error";

export default function suite() {
	it("Returns 401 Unauthorized", async () => {
		const responses = [
			await chai.request(server).post(BaseUrl_Users + "/"),
			await chai.request(server).get(BaseUrl_Users + "/"),
			await chai.request(server).put(BaseUrl_Users + "/" + v4()),
			await chai.request(server).delete(BaseUrl_Users + "/" + v4()),
		];
		responses.forEach((response) => expectError(response, 401, "Unauthorized"));
	});
}
