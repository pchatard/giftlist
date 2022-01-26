import "mocha";
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../../src/index";
import { BaseUrl_Unauthorized } from "../global";
import { expectError } from "../helpers/errors";

chai.use(chaiHttp);

export default function suite() {
	it("Returns 401 Unauthorized", async () => {
		const responses = [
			await chai.request(server).delete(BaseUrl_Unauthorized),
			await chai.request(server).get(BaseUrl_Unauthorized),
			await chai.request(server).post(BaseUrl_Unauthorized),
			await chai.request(server).put(BaseUrl_Unauthorized),
		];
		responses.forEach((response) => expectError(response, 401, "Unauthorized"));
	});
}
